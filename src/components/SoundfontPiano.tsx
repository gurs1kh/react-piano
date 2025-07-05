import { useCallback, useEffect, useMemo } from 'react';
import { InstrumentName } from 'soundfont-player';
import { Piano, PianoProps } from './Piano';
import { useSoundfont } from '../hooks';
import { MidiNumbers, Note } from '../utils';

interface SoundfontPianoProps extends Omit<PianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote' | 'noteRange'> {
  width: number;
  instrumentName?: InstrumentName;
  audioContext?: AudioContext;
  soundfontHostname?: string;
  onPlayNote?: (midiNumber: number) => void;
  onStopNote?: (midiNumber: number) => void;
  noteRange: {
    first: number;
    last: number;
  } | {
    first: Note;
    last: Note;
  };
}

export const SoundfontPiano = (props: SoundfontPianoProps) => {
  const {
    width,
    instrumentName,
    noteRange: noteRangeProp,
    audioContext,
    soundfontHostname,
    keyboardShortcuts,
    disabled = false,
    onPlayNote = () => 0,
    onStopNote = () => 0,
  } = props;

  const noteRange = useMemo(() => {
    return (typeof noteRangeProp.first === 'number')
      ? noteRangeProp
      : {
        first: MidiNumbers.fromNote(noteRangeProp.first),
        last: MidiNumbers.fromNote(noteRangeProp.last),
      };
  }, [noteRangeProp]);

  const { playNote, stopNote, isLoading, stopAllNotes } = useSoundfont({
    audioContext,
    instrumentName,
    hostname: soundfontHostname,
  });

  useEffect(() => {
    stopAllNotes();
  }, [instrumentName, noteRange, keyboardShortcuts, stopAllNotes]);

  const playNoteCallback = useCallback((midiNumber: number) => {
    onPlayNote(midiNumber);
    playNote(midiNumber);
  }, [onPlayNote, playNote]);

  const stopNoteCallback = useCallback((midiNumber: number) => {
    onStopNote(midiNumber);
    stopNote(midiNumber);
  }, [onStopNote, stopNote]);

  return (
    <Piano
      noteRange={noteRange}
      keyboardShortcuts={keyboardShortcuts}
      playNote={playNoteCallback}
      stopNote={stopNoteCallback}
      disabled={isLoading || disabled}
      width={width}
    />
  );
}
