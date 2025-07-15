import { useCallback } from 'react';
import range from 'just-range';
import classNames from 'classnames';

import { Key, KeyColor } from './Key';
import { MidiNumbers } from '../utils/MidiNumbers';

export interface KeyboardProps {
  noteRange: {
    first: number;
    last: number;
  };
  activeNotes: number[];
  onPlayNoteInput: (midiNumber: number) => void;
  onStopNoteInput: (midiNumber: number) => void;
  keyWidthToHeight?: number;
  className?: string;
  disabled?: boolean;
  gliss?: boolean;
  useTouchEvents?: boolean;
  width?: number;
  disableActiveStying?: boolean;
  keyLabels?: Record<number, string>;
  keyColors?: Record<number, KeyColor>;
}

export const Keyboard = (props: KeyboardProps) => {
  const {
    noteRange,
    activeNotes,
    onPlayNoteInput,
    onStopNoteInput,
    keyWidthToHeight = 0.33,
    className = '',
    disabled = false,
    gliss = false,
    useTouchEvents = false,
    width,
    disableActiveStying,
    keyLabels = {},
    keyColors = {},
  } = props;

  // Range of midi numbers on keyboard
  const getMidiNumbers = useCallback(() => {
    return range(noteRange.first, noteRange.last + 1);
  }, [noteRange.first, noteRange.last]);

  const getNaturalKeyCount = useCallback(() => {
    return getMidiNumbers().filter((number: number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }, [getMidiNumbers]);

  // Returns a ratio between 0 and 1
  const getNaturalKeyWidth = useCallback(() => {
    return 1 / getNaturalKeyCount();
  }, [getNaturalKeyCount]);

  const getWidth = useCallback(() => {
    return width ? width : '100%';
  }, [width]);

  const getHeight = useCallback(() => {
    if (!width) {
      return '100%';
    }
    const keyWidth = width * getNaturalKeyWidth();
    return `${keyWidth / (keyWidthToHeight || 0.33)}px`;
  }, [width, getNaturalKeyWidth, keyWidthToHeight]);

  const midiNumbers = getMidiNumbers();
  const naturalKeyWidth = getNaturalKeyWidth();

  return (
    <div
      className={classNames('ReactPiano__Keyboard', className)}
      style={{ width: getWidth(), height: getHeight() }}
    >
      {midiNumbers.map((midiNumber: number) => {
        const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
        const isActive = !disabled && activeNotes.includes(midiNumber);
        return (
          <Key
            naturalKeyWidth={naturalKeyWidth}
            midiNumber={midiNumber}
            noteRange={noteRange}
            active={!disableActiveStying && isActive}
            accidental={isAccidental}
            disabled={disabled}
            onPlayNoteInput={onPlayNoteInput}
            onStopNoteInput={onStopNoteInput}
            gliss={gliss}
            useTouchEvents={useTouchEvents}
            key={midiNumber}
            label={keyLabels[midiNumber]}
            keyColor={keyColors[midiNumber]}
          />
        );
      })}
    </div>
  );
};
