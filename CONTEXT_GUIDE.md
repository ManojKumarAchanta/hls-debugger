# Context & Config Guide

This project now includes a simple global application context implemented with React's `useReducer`.

Files added/updated
- `src/context/AppContext.tsx`: Provides `AppProvider` and `useAppContext()` hook.
- `src/App.tsx`: Wrapped with `<AppProvider>` so child components can read state and dispatch actions.
- `src/components/Controls/Controls.tsx`: Updated to use the context's custom `dispatch` wrapper for known controls.

Quick overview
- State: `url`, `isPlaying`, `volume`, `playbackRate`, `currentTime`, `duration`, `status`, `quality`.
- Actions: `SET_URL`, `PLAY`, `PAUSE`, `TOGGLE_PLAY`, `SET_VOLUME`, `SET_PLAYBACK_RATE`, `SET_CURRENT_TIME`, `SET_DURATION`, `SET_STATUS`, `SET_QUALITY`.
- `useReducer` reducer handles state updates.

Custom dispatch wrapper
- Use the `dispatch` returned by `useAppContext()` like `dispatch(type, payload)`.
- The wrapper validates and normalizes inputs for some actions (for example `SET_PLAYBACK_RATE` accepts strings like `"1x (Normal)"`).

How to use in a component

1. Import the hook:

   const { state, dispatch } = useAppContext();

2. Read state: `state.playbackRate`, `state.isPlaying`, etc.

3. Dispatch actions:

   - `dispatch('PLAY')`
   - `dispatch('PAUSE')`
   - `dispatch('SET_VOLUME', 0.5)`
   - `dispatch('SET_PLAYBACK_RATE', '1.5x')`

Extending
- To add new state fields or actions, update `State`, `Action` and the `reducer` in `src/context/AppContext.tsx`.
- The `dispatch` wrapper can be extended to include more validation or side-effects.

Notes
- The context is intentionally small and focused on player state; keep side-effects (networking, player APIs) outside the reducer.
- If you need to call async operations, call them from components or custom hooks and then dispatch results into context.
