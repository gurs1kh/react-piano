import { useState, useEffect, useCallback,  useRef, ReactNode } from 'react';
import classNames from 'classnames';
import difference from 'lodash.difference';
import { Keyboard } from './Keyboard';

export interface ControlledPianoProps {
  noteRange: {
    first: number;
    last: number;
  };
  activeNotes: number[];
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  onPlayNoteInput: (midiNumber: number, prevActiveNotes: number[]) => void;
  onStopNoteInput: (midiNumber: number, prevActiveNotes: number[]) => void;
  renderNoteLabel?: (params: {
    keyboardShortcut?: string | null;
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }) => ReactNode;
  className?: string;
  disabled?: boolean;
  width?: number;
  keyWidthToHeight?: number;
  keyboardShortcuts?: Array<{
    key: string;
    midiNumber: number;
  }>;
}

const defaultRenderNoteLabel = ({
  keyboardShortcut,
  isActive,
  isAccidental,
}: {
  keyboardShortcut?: string | null;
  isActive: boolean;
  isAccidental: boolean;
}) =>
  keyboardShortcut ? (
    <div
      className={classNames('ReactPiano__NoteLabel', {
        'ReactPiano__NoteLabel--active': isActive,
        'ReactPiano__NoteLabel--accidental': isAccidental,
        'ReactPiano__NoteLabel--natural': !isAccidental,
      })}
    >
      {keyboardShortcut}
    </div>
  ) : null;

export const ControlledPiano = (props: ControlledPianoProps) => {
  const {
    noteRange,
    activeNotes,
    playNote,
    stopNote,
    onPlayNoteInput,
    onStopNoteInput,
    renderNoteLabel = defaultRenderNoteLabel,
    className,
    disabled = false,
    width,
    keyWidthToHeight,
    keyboardShortcuts,
  } = props;

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [useTouchEvents, setUseTouchEvents] = useState(false);
  const prevActiveNotesRef = useRef<number[]>(activeNotes);

  useEffect(() => {
    if (disabled) return;
    const prevActiveNotes = prevActiveNotesRef.current || [];
    const notesStopped = difference(prevActiveNotes, activeNotes);
    const notesStarted = difference(activeNotes, prevActiveNotes);
    notesStarted.forEach((midiNumber) => {
      playNote(midiNumber);
    });
    notesStopped.forEach((midiNumber) => {
      stopNote(midiNumber);
    });
    prevActiveNotesRef.current = activeNotes;
  }, [activeNotes, playNote, stopNote, disabled]);

  const getMidiNumberForKey = useCallback(
    (key: string): number | null => {
      if (!keyboardShortcuts) return null;
      const shortcut = keyboardShortcuts.find((sh) => sh.key === key);
      return shortcut ? shortcut.midiNumber : null;
    },
    [keyboardShortcuts]
  );

  const getKeyForMidiNumber = useCallback(
    (midiNumber: number): string | null => {
      if (!keyboardShortcuts) return null;
      const shortcut = keyboardShortcuts.find((sh) => sh.midiNumber === midiNumber);
      return shortcut ? shortcut.key : null;
    },
    [keyboardShortcuts]
  );

  const handlePlayNoteInput = useCallback(
    (midiNumber: number) => {
      if (disabled) return;
      onPlayNoteInput(midiNumber, activeNotes);
    },
    [onPlayNoteInput, activeNotes, disabled]
  );

  const handleStopNoteInput = useCallback(
    (midiNumber: number) => {
      if (disabled) return;
      onStopNoteInput(midiNumber, activeNotes);
    },
    [onStopNoteInput, activeNotes, disabled]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      const midiNumber = getMidiNumberForKey(event.key);
      if (midiNumber) {
        handlePlayNoteInput(midiNumber);
      }
    },
    [getMidiNumberForKey, handlePlayNoteInput]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const midiNumber = getMidiNumberForKey(event.key);
      if (midiNumber) {
        handleStopNoteInput(midiNumber);
      }
    },
    [getMidiNumberForKey, handleStopNoteInput]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);
  const handleTouchStart = () => setUseTouchEvents(true);

  const renderNoteLabelWithShortcut = useCallback(
    ({
      midiNumber,
      isActive,
      isAccidental,
    }: {
      midiNumber: number;
      isActive: boolean;
      isAccidental: boolean;
    }) => {
      const keyboardShortcut = getKeyForMidiNumber(midiNumber);
      return renderNoteLabel({ keyboardShortcut, midiNumber, isActive, isAccidental });
    },
    [getKeyForMidiNumber, renderNoteLabel]
  );

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      data-testid="container"
    >
      <Keyboard
        noteRange={noteRange}
        onPlayNoteInput={handlePlayNoteInput}
        onStopNoteInput={handleStopNoteInput}
        activeNotes={activeNotes}
        className={className}
        disabled={disabled}
        width={width}
        keyWidthToHeight={keyWidthToHeight}
        gliss={isMouseDown}
        useTouchEvents={useTouchEvents}
        renderNoteLabel={renderNoteLabelWithShortcut}
      />
    </div>
  );
};
