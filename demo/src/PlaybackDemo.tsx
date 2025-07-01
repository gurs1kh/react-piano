import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import classNames from 'classnames';

import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';

const PLAY_DURATION = 200;

interface PlaybackDemoProps {
  audioContext: AudioContext;
  soundfontHostname: string;
  song: number[][];
}

const PlaybackDemo: React.FC<PlaybackDemoProps> = ({ audioContext, soundfontHostname, song }) => {
  const [activeNotesIndex, setActiveNotesIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stopAllNotes, setStopAllNotes] = useState<() => void>(() => () => console.warn('stopAllNotes not yet loaded'));
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setActiveNotesIndex((prevIndex) => (prevIndex + 1) % song.length);
      }, PLAY_DURATION);
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
      stopAllNotes();
      setActiveNotesIndex(0);
    }
    return () => {
      if (!playbackIntervalRef.current) return;
      clearInterval(playbackIntervalRef.current);
    };
  }, [isPlaying, song.length, stopAllNotes]);

  useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
      stopAllNotes();
    };
  }, []);

  const setPlaying = useCallback((value: boolean) => {
    setIsPlaying(value);
  }, []);

  const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  };

  return (
    <div>
      <div className="text-center">
        <p>Or try playing it back.</p>
        <div>
          <button
            className={classNames('btn', {
              'btn-outline-info': !isPlaying,
              'btn-outline-danger': isPlaying,
            })}
            onClick={() => setPlaying(!isPlaying)}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <SoundfontProvider
          audioContext={audioContext}
          instrumentName="ocarina"
          hostname={soundfontHostname}
          onLoad={({ stopAllNotes }) => setStopAllNotes(() => stopAllNotes)}
          playDuration={PLAY_DURATION}
          render={({ isLoading, playNote, stopNote }) => (
            <DimensionsProvider>
              {({ containerWidth }) => (
                <Piano
                  activeNotes={isPlaying ? song[activeNotesIndex] : []}
                  noteRange={noteRange}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading || !isPlaying}
                />
              )}
            </DimensionsProvider>
          )}
        />
      </div>
    </div>
  );
};

export default PlaybackDemo;
