import { useRef, useCallback, useEffect } from 'react';

export const useHeartbeatAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playHeartbeat = useCallback((bpm: number) => {
    if (isMutedRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Create the "lub" sound (lower frequency)
    const lubOsc = ctx.createOscillator();
    const lubGain = ctx.createGain();
    const lubFilter = ctx.createBiquadFilter();

    lubOsc.type = 'sine';
    lubOsc.frequency.setValueAtTime(60, now);
    lubFilter.type = 'lowpass';
    lubFilter.frequency.value = 200;
    
    lubGain.gain.setValueAtTime(0.3, now);
    lubGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    lubOsc.connect(lubFilter);
    lubFilter.connect(lubGain);
    lubGain.connect(ctx.destination);

    lubOsc.start(now);
    lubOsc.stop(now + 0.15);

    // Create the "dub" sound (slightly higher, delayed)
    const dubOsc = ctx.createOscillator();
    const dubGain = ctx.createGain();
    const dubFilter = ctx.createBiquadFilter();

    dubOsc.type = 'sine';
    dubOsc.frequency.setValueAtTime(45, now + 0.1);
    dubFilter.type = 'lowpass';
    dubFilter.frequency.value = 150;

    dubGain.gain.setValueAtTime(0, now);
    dubGain.gain.setValueAtTime(0.25, now + 0.1);
    dubGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    dubOsc.connect(dubFilter);
    dubFilter.connect(dubGain);
    dubGain.connect(ctx.destination);

    dubOsc.start(now + 0.1);
    dubOsc.stop(now + 0.25);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    isMutedRef.current = muted;
  }, []);

  const resumeContext = useCallback(async () => {
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    initAudio,
    playHeartbeat,
    setMuted,
    resumeContext,
    isMuted: isMutedRef.current,
  };
};
