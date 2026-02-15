import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import iconConfig from "../../utils/icons";
import Styles from "./videoPlayer.module.css";
import { useAppContext } from "../../context/AppContext";

const VideoPlayer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const plyrRef = useRef<any>(null);
  const hlsRef = useRef<any>(null);
  const loadIdRef = useRef(0);
  const { state, dispatch } = useAppContext();
  const url = state.url;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // create a native video element and attach Plyr
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.className = "plyr__video-embed";
    container.appendChild(video);
    videoRef.current = video;

    // initialize Plyr
    const player = new Plyr(video, {
      controls: ["play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
      settings: ["quality", "speed"],
      invertTime: false,
    });
    plyrRef.current = player;

    player.on("play", () => dispatch("SET_STATUS", "playing"));
    player.on("pause", () => dispatch("SET_STATUS", "idle"));

    return () => {
      try { player.destroy(); } catch { /* ignore */ }
      try { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } } catch { /* ignore */ }
      if (video && video.parentNode) video.parentNode.removeChild(video);
      plyrRef.current = null;
      videoRef.current = null;
    };
  }, [dispatch]);

  useEffect(() => {
    const video = videoRef.current;
    const player = plyrRef.current;
    if (!player || !video) return;

    loadIdRef.current += 1;
    const currentLoadId = loadIdRef.current;

    if (!url) {
      try { player.source = { type: 'video', sources: [] }; } catch { video.src = ''; }
      dispatch("SET_STATUS", "idle");
      return;
    }

    dispatch("ADD_LOG", { level: "info", message: `Loading: ${url}` });

    // destroy previous hls if present
    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }

    if (Hls.isSupported() && /\.m3u8(\?|$)/i.test(url)) {
      const hls = new Hls();
      hlsRef.current = hls;
      dispatch("ADD_LOG", { level: "info", message: `hls.js initialized (v${(Hls as any).version ?? "?"})` });
      hls.loadSource(url);
      hls.attachMedia(video);

      const safeDispatchStats = () => {
        try {
          const v = videoRef.current;
          if (!v) return;
          // compute buffer length in seconds for current playhead
          let bufferLength = 0;
          try {
            const { buffered } = v;
            const currentTime = v.currentTime ?? 0;
            for (let i = 0; i < buffered.length; i++) {
              if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
                bufferLength = Math.round(buffered.end(i) - currentTime);
                break;
              }
            }
          } catch { bufferLength = 0; }

          const resolution = `${v.videoWidth ?? 0}x${v.videoHeight ?? 0}`;
          const quality = (v as any).getVideoPlaybackQuality?.();
          const dropped = typeof quality?.droppedVideoFrames === "number" ? quality.droppedVideoFrames : 0;
          let bwKbps = 0;
          try { bwKbps = Math.round((hls.bandwidthEstimate ?? 0) / 1000); } catch { bwKbps = 0; }
          // prefer level bitrate if available
          try {
            const level = hls.levels?.[hls.currentLevel];
            if (level && typeof level.bitrate === "number") {
              bwKbps = Math.round(level.bitrate / 1000);
            }
          } catch { /* ignore */ }

          dispatch("SET_STATS", { droppedFrames: dropped, bitrateKbps: bwKbps, bandwidthKbps: bwKbps, bufferLength, resolution });
        } catch (e) { /* ignore */ }
      };

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (currentLoadId !== loadIdRef.current) return;
        dispatch("ADD_LOG", { level: "info", message: `Manifest parsed — ${hls.levels?.length ?? 0} quality levels` });
        player.play().then(() => { dispatch("SET_STATUS", "playing"); dispatch("ADD_LOG", { level: 'info', message: 'Playback started' }); }).catch(() => {});
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_ev, data) => {
        try {
          const lvl = hls.currentLevel;
          const levelInfo = hls.levels?.[lvl];
          const bw = levelInfo?.bitrate ? Math.round(levelInfo.bitrate / 1000) : 0;
          dispatch("SET_QUALITY", `${lvl} (${bw} kbps)`);
          dispatch("ADD_LOG", { level: "info", message: `Level switched -> ${lvl} (${bw} kbps)` });
          safeDispatchStats();
        } catch (e) { /* ignore */ }
      });

      hls.on(Hls.Events.LEVEL_LOADING, (_ev, data) => {
        dispatch("ADD_LOG", { level: "info", message: `Level loading -> ${data?.level}` });
      });

      hls.on(Hls.Events.FRAG_LOADED, (_ev, data) => {
        dispatch("ADD_LOG", { level: "event", message: `Fragment loaded: ${data?.frag?.url ?? data?.frag?.level ?? "?"}` });
        safeDispatchStats();
      });

      hls.on(Hls.Events.FRAG_BUFFERED, (_ev, data) => {
        dispatch("ADD_LOG", { level: "event", message: `Fragment buffered: ${data?.frag?.url ?? data?.frag?.level ?? "?"}` });
        safeDispatchStats();
      });

      hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        const fatal = data?.fatal ? 'FATAL' : 'NON-FATAL';
        dispatch("ADD_LOG", { level: data?.fatal ? 'error' : 'warn', message: `hls.js ${fatal} error: ${data?.type}/${data?.details} ${data?.reason ? '- ' + data.reason : ''}` });
        // try to recover common errors
        if (data?.fatal) {
          try {
            hls.recoverMediaError?.();
            dispatch("ADD_LOG", { level: 'info', message: 'Attempted media error recovery' });
          } catch { /* ignore */ }
        }
        safeDispatchStats();
      });
    } else {
      // fallback to native playback (Safari or browsers with native HLS)
      video.src = url;
      video.load();
      video.play().then(() => {
        dispatch("SET_STATUS", "playing");
        dispatch("ADD_LOG", { level: 'info', message: 'Playback started (native)' });
      }).catch((err) => {
        if ((err as any)?.name === 'NotAllowedError') {
          dispatch("ADD_LOG", { level: 'warn', message: 'Autoplay blocked – click play to start' });
          dispatch("SET_STATUS", "idle");
        } else {
          dispatch("ADD_LOG", { level: 'error', message: `Playback failed: ${String(err)}` });
          dispatch("SET_STATUS", "idle");
        }
      });
    }

    // basic stats polling
    const statInterval = setInterval(() => {
      const v = videoRef.current;
      if (!v) return;
      const currentTime = v.currentTime ?? 0;
      const duration = v.duration ?? 0;
      const resolution = `${v.videoWidth ?? 0}x${v.videoHeight ?? 0}`;
      const dropped = 0;
      dispatch("SET_STATS", { droppedFrames: dropped, bitrateKbps: 0, bandwidthKbps: 0, bufferLength: 0, resolution });
      dispatch("SET_CURRENT_TIME", currentTime);
      dispatch("SET_DURATION", duration);
    }, 1000);

    return () => {
      clearInterval(statInterval);
    };
  }, [url, dispatch, state.reloadId]);

  // Apply external control changes from global state (volume, rate, play/pause, seek, quality)
  useEffect(() => {
    const video = videoRef.current;
    const player = plyrRef.current;
    const hls = hlsRef.current;
    if (!video || !player) return;

    try {
      // playback rate
      if (typeof state.playbackRate === 'number') {
        video.playbackRate = state.playbackRate;
      }
    } catch {}

    try {
      // volume
      if (typeof state.volume === 'number') {
        video.volume = Math.max(0, Math.min(1, state.volume));
      }
    } catch {}

    try {
      // play / pause
      if (state.isPlaying) video.play().catch(() => {});
      else video.pause();
    } catch {}

    try {
      // seek if user set a different currentTime
      if (typeof state.currentTime === 'number') {
        const diff = Math.abs((video.currentTime ?? 0) - state.currentTime);
        if (diff > 0.5) video.currentTime = state.currentTime;
      }
    } catch {}

    try {
      // quality / ABR: state.quality is set by hls events as e.g. "0 (365 kbps)" or "Auto (ABR)"
      if (hls) {
        if (state.adaptiveBitRateEnabled) {
          hls.currentLevel = -1; // enable ABR
        } else if (typeof state.quality === 'string' && !/auto/i.test(state.quality)) {
          const m = state.quality.match(/^(\d+)/);
          if (m) {
            const lvl = parseInt(m[1], 10);
            if (!Number.isNaN(lvl)) {
              hls.currentLevel = lvl;
              dispatch('ADD_LOG', { level: 'event', message: `Manual quality set -> ${lvl}` });
            }
          }
        }
      }
    } catch {}
  }, [state.playbackRate, state.volume, state.isPlaying, state.currentTime, state.quality, state.adaptiveBitRateEnabled, dispatch]);

  return (
    <div className={Styles.videoPlayerContainer}>
      {!state.url && (
        <div className={Styles.previewOverlay}>
          <span className={Styles.previewOverlayIcon}>{iconConfig.polygonPlayerIcon}</span>
          <span className={Styles.previewOverlayText}>Load a stream to start debugging</span>
        </div>
      )}
      <div ref={containerRef} className={Styles.playerContainer} />
    </div>
  );
};

export default VideoPlayer;