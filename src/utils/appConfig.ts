import iconConfig from "./icons";

export type Status = "idle" | "loading" | "playing" | "error";

export const statsConfig: { key: string; value: string; icon?: any; unit?: string }[] = [
    { key: "Status", value: "idle"},
    { key: "Resolution", value: "0x0" , icon: iconConfig.resolutionIcon},
    { key: "Bitrate", value: "0", unit: "kbps", icon: iconConfig.bitRateIcon },
    { key: "Bandwidth", value: "0", unit: "kbps", icon: iconConfig.bandWidthIcon },
    { key: "Buffer Length", value: "0", unit: "s", icon: iconConfig.bufferLengthIcon },
    { key: "Dropped Frames", value: "0", unit: "", icon: iconConfig.droppedFramesIcon },
];

export const controlsConfig = [
    { key: "Quality Level", onSelect: (value: string) => console.log("Quality Level changed to:", value), icon: iconConfig.qualityIcon, options: ["Auto (ABR)", "1080p (5000 kbps)", "720p (3000 kbps)", "480p (1500 kbps)", "360p (800 kbps)", "240p (400 kbps)"] },
    { key: "Playback Speed", onSelect: (value: string) => console.log("Playback Speed changed to:", value), icon: iconConfig.bitRateIcon, options: ["0.25x", "0.5x", "0.75x", "1x (Normal)", "1.25x", "1.5x", "2x"] },
]