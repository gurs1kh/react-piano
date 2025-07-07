import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { InstrumentName } from 'soundfont-player';
import { useKeyboardShortcuts, useSoundfont } from '../hooks';
import { NoteRange, useNoteRange } from '../hooks/useNoteRange';
import difference from 'lodash.difference';
import { ControlledPiano, ControlledPianoProps } from './ControlledPiano';

interface SoundfontPianoProps extends Omit<ControlledPianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote' | 'noteRange'> {
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

export interface SoundfontPianoRef {
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  stopAllNotes: () => void;
}

export const SoundfontPiano = forwardRef<SoundfontPianoRef, SoundfontPianoProps>((props, ref) => {
  const {
    activeNotes,
    onAddActiveNote = () => 0,
    onRemoveActiveNote = () => 0,
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
  const prevActiveNotesRef = useRef<number[]>(activeNotes);

  const { playNote, stopNote, isLoading, stopAllNotes } = useSoundfont({
    audioContext,
    instrumentName,
    hostname: soundfontHostname,
  });

  useImperativeHandle(ref, () => ({
    playNote,
    stopNote,
    stopAllNotes,
  }), [playNote, stopNote, stopAllNotes]);

  const { keyboardShortcuts } = useKeyboardShortcuts({
    noteRange,
    initialOffset: keyboardShortcutInitialOffset,
    onAddActiveNote,
    onRemoveActiveNote,
  });

  useEffect(() => {
    stopAllNotes();
    prevActiveNotesRef.current = [];
  }, [instrumentName, noteRange, keyboardShortcuts, stopAllNotes]);

  useEffect(() => {
    if (disabled) return;
    const prevActiveNotes = prevActiveNotesRef.current || [];
    const notesStopped = difference(prevActiveNotes, activeNotes);
    const notesStarted = difference(activeNotes, prevActiveNotes);
    notesStarted.forEach((midiNumber) => {
      onPlayNote(midiNumber);
      if (!muted) playNote(midiNumber);
    });
    notesStopped.forEach((midiNumber) => {
      onStopNote(midiNumber);
      if (!muted) stopNote(midiNumber);
    });
    prevActiveNotesRef.current = activeNotes;
  }, [activeNotes, disabled, muted, onPlayNote, playNote, onStopNote, stopNote]);

  return (
    <ControlledPiano
      activeNotes={activeNotes}
      onAddActiveNote={onAddActiveNote}
      onRemoveActiveNote={onRemoveActiveNote}
      noteRange={noteRange}
      keyboardShortcuts={enableKeyboardShortcuts ? keyboardShortcuts : undefined}
      disabled={isLoading || disabled}
      width={width}
    />
  );
});

SoundfontPiano.displayName = 'SoundfontPiano';
