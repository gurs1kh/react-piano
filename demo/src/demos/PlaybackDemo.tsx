import { useState, useEffect, useRef, useCallback } from 'react';
import { Piano, MidiNumbers, useSoundfont } from 'react-piano';
import classNames from 'classnames';
import useDimensions from 'react-use-dimensions';
import { lostWoods as song } from '../data/songs'; // Adjust the import path as necessary

export const PlaybackDemo =() => {
  const [activeNotesIndex, setActiveNotesIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [ref, { width: containerWidth }] = useDimensions();
  const { isLoading, playNote, stopNote, stopAllNotes } = useSoundfont({ instrumentName: 'ocarina' });

  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setActiveNotesIndex((prevIndex) => (prevIndex + 1) % song.notes.length);
      }, song.playDuration);
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
  }, [isPlaying, song.notes.length, stopAllNotes]);

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
          activeNotes={isPlaying ? song.notes[activeNotesIndex] : []}
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
