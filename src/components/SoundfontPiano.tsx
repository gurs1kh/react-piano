import { useCallback, useEffect } from 'react';
import { InstrumentName } from 'soundfont-player';
import { Piano, PianoProps } from './Piano';
import { useSoundfont } from '../hooks';
import { NoteRange, useNoteRange } from '../hooks/useNoteRange';

interface SoundfontPianoProps extends Omit<PianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote' | 'noteRange'> {
  width: number;
  instrumentName?: InstrumentName;
  audioContext?: AudioContext;
  soundfontHostname?: string;
  onPlayNote?: (midiNumber: number) => void;
  onStopNote?: (midiNumber: number) => void;
  noteRange: NoteRange;
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

  const { noteRange } = useNoteRange(noteRangeProp);
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
