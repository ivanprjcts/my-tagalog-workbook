'use client';

import { createContext, useContext } from 'react';

export const AudioEnabledContext = createContext(true);

export function useAudioEnabled() {
  return useContext(AudioEnabledContext);
}
