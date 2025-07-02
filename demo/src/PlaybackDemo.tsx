import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import classNames from 'classnames';
import useDimensions from 'react-use-dimensions';
import { useSoundfont } from './hooks/useSoundfont';

const PLAY_DURATION = 200;

interface PlaybackDemoProps {
  audioContext: AudioContext;
  soundfontHostname: string;
  song: number[][];
}

export const PlaybackDemo: React.FC<PlaybackDemoProps> = ({ audioContext, soundfontHostname, song }) => {
  const [activeNotesIndex, setActiveNotesIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [ref, { width: containerWidth }] = useDimensions();
  const { isLoading, playNote, stopNote, stopAllNotes } = useSoundfont({
    audioContext,
    instrumentName: 'ocarina',
    hostname: soundfontHostname,
    playDuration: PLAY_DURATION,
  });

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
      <div className="mt-4" ref={ref}>
        <Piano
          activeNotes={isPlaying ? song[activeNotesIndex] : []}
          noteRange={noteRange}
          width={containerWidth}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading || !isPlaying}
        />
      </div>
    </div>
  );
};
