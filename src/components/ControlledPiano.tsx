import { useState, useCallback } from 'react';
import { Keyboard } from './Keyboard';
import { KeyColor } from './Key';

export interface ControlledPianoProps {
  noteRange: {
    first: number;
    last: number;
  };
  activeNotes?: number[];
  onAddActiveNote?: (midiNumber: number) => void;
  onRemoveActiveNote?: (midiNumber: number) => void;
  className?: string;
  disabled?: boolean;
  disableActiveStying?: boolean;
  width?: number;
  keyWidthToHeight?: number;
  keyLabels?: Record<number, string>;
  keyColors?: Record<number, KeyColor>;
}

export const ControlledPiano = (props: ControlledPianoProps) => {
  const {
    noteRange,
    activeNotes = [],
    onAddActiveNote = () => 0,
    onRemoveActiveNote = () => 0,
    className,
    disabled = false,
    disableActiveStying = false,
    width,
    keyWidthToHeight,
    keyLabels,
    keyColors,
  } = props;

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [useTouchEvents, setUseTouchEvents] = useState(false);

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
        disableActiveStying={disableActiveStying}
        keyLabels={keyLabels}
        keyColors={keyColors}
      />
    </div>
  );
};
