import { useState, useCallback, useRef, useEffect } from 'react';

interface HeartbeatState {
  bpm: number;
  isActive: boolean;
  isSynced: boolean;
  emotionalState: 'calm' | 'moved' | 'passionate';
  touchDuration: number;
}

export const useHeartbeat = () => {
  const [state, setState] = useState<HeartbeatState>({
    bpm: 60,
    isActive: false,
    isSynced: false,
    emotionalState: 'calm',
    touchDuration: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getEmotionalState = (bpm: number): 'calm' | 'moved' | 'passionate' => {
    if (bpm < 70) return 'calm';
    if (bpm <= 90) return 'moved';
    return 'passionate';
  };

  const startHeartbeat = useCallback(() => {
    touchStartRef.current = Date.now();
    setState(prev => ({ ...prev, isActive: true }));

    // Simulate gradual heart rate increase
    intervalRef.current = setInterval(() => {
      setState(prev => {
        const newBpm = Math.min(prev.bpm + Math.random() * 5 + 2, 120);
        const touchDuration = (Date.now() - touchStartRef.current) / 1000;
        
        return {
          ...prev,
          bpm: newBpm,
          emotionalState: getEmotionalState(newBpm),
          touchDuration,
        };
      });
    }, 500);

    // Trigger sync after 5 seconds
    syncTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isSynced: true }));
    }, 5000);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = null;
    }

    // Gradual slowdown
    const slowdownInterval = setInterval(() => {
      setState(prev => {
        if (prev.bpm <= 60) {
          clearInterval(slowdownInterval);
          return { ...prev, isActive: false, isSynced: false, bpm: 60, emotionalState: 'calm' };
        }
        const newBpm = prev.bpm - 5;
        return { ...prev, bpm: newBpm, emotionalState: getEmotionalState(newBpm) };
      });
    }, 300);
  }, []);

  const resetHeartbeat = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    setState({
      bpm: 60,
      isActive: false,
      isSynced: false,
      emotionalState: 'calm',
      touchDuration: 0,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, []);

  return {
    ...state,
    startHeartbeat,
    stopHeartbeat,
    resetHeartbeat,
    beatInterval: 60000 / state.bpm, // ms between beats
  };
};
