import { useState, useCallback, ReactNode } from 'react';
import classNames from 'classnames';
import { Keyboard } from './Keyboard';

export interface ControlledPianoProps {
  noteRange: {
    first: number;
    last: number;
  };
  activeNotes?: number[];
  onAddActiveNote?: (midiNumber: number) => void;
  onRemoveActiveNote?: (midiNumber: number) => void;
  renderNoteLabel?: (params: {
    keyboardShortcut?: string | null;
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }) => ReactNode;
  className?: string;
  disabled?: boolean;
  disableActiveStying?: boolean;
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
    activeNotes = [],
    onAddActiveNote = () => 0,
    onRemoveActiveNote = () => 0,
    renderNoteLabel = defaultRenderNoteLabel,
    className,
    disabled = false,
    disableActiveStying = false,
    width,
    keyWidthToHeight,
    keyboardShortcuts,
  } = props;

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [useTouchEvents, setUseTouchEvents] = useState(false);

  const getKeyForMidiNumber = useCallback(
    (midiNumber: number): string | null => {
      if (!keyboardShortcuts) return null;
      const shortcut = keyboardShortcuts.find((sh) => sh.midiNumber === midiNumber);
      return shortcut ? shortcut.key : null;
    },
    [keyboardShortcuts]
  );

  const handlePlayNoteInput = useCallback((midiNumber: number) => {
    if (disabled) return;

    onAddActiveNote(midiNumber);
  },[disabled, onAddActiveNote]);

  const handleStopNoteInput = useCallback((midiNumber: number) => {
    if (disabled) return;

    onRemoveActiveNote(midiNumber);
  }, [disabled, onRemoveActiveNote]);

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
      return renderNoteLabel({
        keyboardShortcut,
        midiNumber,
        isActive: disableActiveStying ? false : isActive,
        isAccidental
      });
    },
    [getKeyForMidiNumber, renderNoteLabel, disableActiveStying]
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
        disableActiveStying={disableActiveStying}
      />
    </div>
  );
};
