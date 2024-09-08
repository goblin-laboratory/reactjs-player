import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { Signal } from '@preact/signals';

const PlayerContext = createContext<{ signal?: Signal<VideoSignal>; dispatch?: dispatchFn }>({});

export function PlayerProvider({
  signal,
  dispatch,
  children,
}: { signal?: Signal<VideoSignal>; dispatch?: dispatchFn; children?: ReactNode }) {
  return <PlayerContext.Provider value={{ signal, dispatch }}>{children}</PlayerContext.Provider>;
}

export default PlayerContext;
