import { useState, useEffect, useRef, useCallback } from 'react';
import { MidiNumbers, SoundfontPiano, SoundfontPianoRef } from 'react-piano';
import classNames from 'classnames';
import useDimensions from 'react-use-dimensions';
import { lostWoods as song } from '../data/songs'; // Adjust the import path as necessary

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext as AudioContext)()

export const PlaybackDemo =() => {
  const [activeNotesIndex, setActiveNotesIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pianoRef = useRef<SoundfontPianoRef>(null);

  const [dimensionsRef, { width: containerWidth }] = useDimensions();

  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setActiveNotesIndex((prevIndex) => (prevIndex + 1) % song.notes.length);
      }, song.playDuration);
    } else {
      clearInterval(playbackIntervalRef.current || 0);
      pianoRef.current?.stopAllNotes();
      setActiveNotesIndex(0);
    }
    return () => {
      clearInterval(playbackIntervalRef.current || 0);
      pianoRef.current?.stopAllNotes();
    };
  }, [isPlaying, song.notes.length]);

  useEffect(() => {
    return () => {
      clearInterval(playbackIntervalRef.current || 0);
      pianoRef.current?.stopAllNotes();
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
      <div className="mt-4" ref={dimensionsRef}>
        <SoundfontPiano
          ref={pianoRef}
          audioContext={audioContext}
          enableKeyboardShortcuts={false}
          instrumentName={song.instrumentName}
          activeNotes={isPlaying ? song.notes[activeNotesIndex] : []}
          noteRange={noteRange}
          width={containerWidth}
          disabled={!isPlaying}
        />
      </div>
    </div>
  );
};
