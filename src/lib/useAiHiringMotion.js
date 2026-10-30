import { useEffect } from 'react';
import { startAiHiringMotion } from './aiHiringMotion.js';

export default function useAiHiringMotion(rootRef) {
  useEffect(() => startAiHiringMotion(rootRef.current), [rootRef]);
}
