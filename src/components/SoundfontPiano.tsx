import { useCallback, useEffect, useRef } from 'react';
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

export const SoundfontPiano = (props: SoundfontPianoProps) => {
  const {
    activeNotes,
    onChangeActiveNotes = () => 0,
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

  const prevActiveNotesRef = useRef<number[]>(activeNotes);

  useEffect(() => {
    if (disabled) return;
    const prevActiveNotes = prevActiveNotesRef.current || [];
    const notesStopped = difference(prevActiveNotes, activeNotes);
    const notesStarted = difference(activeNotes, prevActiveNotes);
    notesStarted.forEach((midiNumber) => {
      playNoteCallback(midiNumber);
    });
    notesStopped.forEach((midiNumber) => {
      stopNoteCallback(midiNumber);
    });
    prevActiveNotesRef.current = activeNotes;
  }, [activeNotes, playNoteCallback, stopNoteCallback, disabled]);

  return (
    <ControlledPiano
      activeNotes={activeNotes}
      onChangeActiveNotes={onChangeActiveNotes}
      noteRange={noteRange}
      keyboardShortcuts={enableKeyboardShortcuts ? keyboardShortcuts : undefined}
      disabled={isLoading || disabled}
      width={width}
    />
  );
}
