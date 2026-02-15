import  { createContext, useContext, useReducer, type ReactNode, useCallback } from "react";
import type { Status } from "../utils/appConfig";

export type State = {
  url: string;
  isPlaying: boolean;
  adaptiveBitRateEnabled?: boolean;
  reloadId?: number;
  logs?: { timestamp: string; level: "info" | "warning" | "error" | "event"; message: string }[];
  stats?: {
    droppedFrames: number;
    bitrateKbps: number;
    bandwidthKbps: number;
    bufferLength: number;
    resolution: string;
  };
  volume: number; // 0..1
  playbackRate: number;
  currentTime: number;
  duration: number;
  status: Status;
  quality?: string;
};

const initialState: State = {
  url: "",
  adaptiveBitRateEnabled: true,
  isPlaying: false,
  logs: [],
  stats: { droppedFrames: 0, bitrateKbps: 0, bandwidthKbps: 0, bufferLength: 0, resolution: "0x0" },
  volume: 1,
  playbackRate: 1,
  currentTime: 0,
  duration: 0,
  status: "idle",
  quality: "Auto (ABR)",
};

type Action =
  | { type: "SET_URL"; payload: string }
  | { type: "RELOAD" }
  | { type: "SET_ADAPTIVE_BITRATE"; payload: boolean }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_PLAYBACK_RATE"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_STATUS"; payload: Status }
  | { type: "ADD_LOG"; payload: { level: "info" | "warning" | "error" | "event"; message: string } }
  | { type: "SET_STATS"; payload: NonNullable<State["stats"]> }
  | { type: "SET_QUALITY"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_URL":
      return { ...state, url: action.payload };
    case "RELOAD":
      return { ...state, reloadId: Date.now() };
    case "SET_ADAPTIVE_BITRATE":
        return {...state, adaptiveBitRateEnabled: action.payload};
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_VOLUME":
      return { ...state, volume: Math.max(0, Math.min(1, action.payload)) };
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload, isPlaying: action.payload === 'playing' };
    case "ADD_LOG":
      return { ...state, logs: [{ timestamp: new Date().toLocaleTimeString(), level: action.payload.level, message: action.payload.message }, ...(state.logs ?? [])] };
    case "SET_STATS":
      return { ...state, stats: { ...(state.stats ?? {}), ...action.payload } };
    case "SET_QUALITY":
      return { ...state, quality: action.payload };
    default:
      return state;
  }
}

type DispatchAction = (type: Action["type"], payload?: any) => void;

const AppStateContext = createContext<State | undefined>(undefined);
const AppDispatchContext = createContext<DispatchAction | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchAction: DispatchAction = useCallback((type, payload) => {
    switch (type) {
      case "SET_VOLUME": {
        const v = typeof payload === "string" ? parseFloat(payload) : payload;
        if (typeof v !== "number" || Number.isNaN(v)) {
          console.warn("SET_VOLUME expects a number payload 0..1");
          return;
        }
        dispatch({ type: "SET_VOLUME", payload: Math.max(0, Math.min(1, v)) });
        return;
      }
      case "SET_PLAYBACK_RATE": {
        let rate = payload;
        if (typeof rate === "string") {
          const matched = rate.match(/([0-9]+\.?[0-9]*)/);
          rate = matched ? parseFloat(matched[1]) : NaN;
        }
        if (typeof rate !== "number" || Number.isNaN(rate)) {
          console.warn("SET_PLAYBACK_RATE expects a numeric payload or a string containing a number");
          return;
        }
        dispatch({ type: "SET_PLAYBACK_RATE", payload: rate });
        return;
      }
      case "SET_ADAPTIVE_BITRATE": {
        dispatch({ type: "SET_ADAPTIVE_BITRATE", payload });
        return;
      }
      case "ADD_LOG": {
        if (!payload || typeof payload.message !== "string") return;
        dispatch({ type: "ADD_LOG", payload });
        return;
      }
      case "SET_STATS": {
        dispatch({ type: "SET_STATS", payload });
        return;
      }
      default: {
        dispatch({ type: type as any, payload } as Action);
      }
    }
  }, [dispatch]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatchAction}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return { state, dispatch } as { state: State; dispatch: DispatchAction };
};
