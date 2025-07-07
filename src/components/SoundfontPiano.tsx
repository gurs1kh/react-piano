import { useCallback, useEffect } from 'react';
import { InstrumentName } from 'soundfont-player';
import { Piano, PianoProps } from './Piano';
import { useKeyboardShortcuts, useSoundfont } from '../hooks';
import { NoteRange, useNoteRange } from '../hooks/useNoteRange';

interface SoundfontPianoProps extends Omit<PianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote' | 'noteRange'> {
  width: number;
  instrumentName?: InstrumentName;
  audioContext?: AudioContext;
  soundfontHostname?: string;
  onPlayNote?: (midiNumber: number) => void;
  onStopNote?: (midiNumber: number) => void;
  noteRange: NoteRange;
  keyboardShortcutInitialOffset?: number;
  enableKeyboardShortcuts?: boolean;
  muted?: boolean;
  audioOnly?: boolean;
}

export const SoundfontPiano = (props: SoundfontPianoProps) => {
  const {
    width,
    instrumentName,
    noteRange: noteRangeProp,
    audioContext,
    soundfontHostname,
    disabled = false,
    onPlayNote = () => 0,
    onStopNote = () => 0,
    keyboardShortcutInitialOffset = 0,
    enableKeyboardShortcuts = true,
    muted = false,
  } = props;

  const { noteRange } = useNoteRange(noteRangeProp);
  const { keyboardShortcuts } = useKeyboardShortcuts({
    noteRange,
    initialOffset: keyboardShortcutInitialOffset,
  });

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
    if (!muted) playNote(midiNumber);
  }, [onPlayNote, playNote, muted]);

  const stopNoteCallback = useCallback((midiNumber: number) => {
    onStopNote(midiNumber);
    if (!muted) stopNote(midiNumber);
  }, [onStopNote, stopNote, muted]);

  return (
    <Piano
      noteRange={noteRange}
      keyboardShortcuts={enableKeyboardShortcuts ? keyboardShortcuts : undefined}
      playNote={playNoteCallback}
      stopNote={stopNoteCallback}
      disabled={isLoading || disabled}
      width={width}
    />
  );
}
