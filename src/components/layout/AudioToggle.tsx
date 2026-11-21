'use client';

import React, { useRef, useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AudioToggle({ className }: { className?: string }) {
  const { isAudioPlaying, toggleAudio } = useUIStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Subtle ambient acoustic room tone synthesized safely via Web Audio API
  // (Zero external audio file dependency, zero load latency)
  useEffect(() => {
    if (isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Gentle warm brown noise / soft room tone
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.15; // Soft warm background level
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter to emulate warm café acoustics
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5); // Smooth fade-in
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
      } catch (err) {
        console.warn('Web Audio not supported or blocked:', err);
      }
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        try {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContextRef.current.currentTime + 0.5
          );
          setTimeout(() => {
            audioContextRef.current?.close();
            audioContextRef.current = null;
          }, 600);
        } catch {
          audioContextRef.current?.close();
          audioContextRef.current = null;
        }
      }
    }

    return () => {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [isAudioPlaying]);

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={cn(
        'relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-caption transition-all duration-350 ease-luxury focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper select-none',
        isAudioPlaying
          ? 'bg-brand-copper/20 text-brand-copper border border-brand-copper/40 shadow-glow-copper'
          : 'bg-surface-secondary text-content-tertiary border border-border-subtle hover:text-content-primary hover:border-border',
        className
      )}
      aria-label={isAudioPlaying ? 'Mute ambient café atmosphere sound' : 'Unmute ambient café atmosphere sound'}
      aria-pressed={isAudioPlaying}
      title={isAudioPlaying ? 'Mute Café Ambience' : 'Play Café Ambience'}
    >
      {isAudioPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-pulse-soft text-brand-copper" />
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">Sound On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">Muted</span>
        </>
      )}
    </button>
  );
}
