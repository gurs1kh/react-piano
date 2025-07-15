import { useCallback, ReactNode } from 'react';
import classNames from 'classnames';

import { MidiNumbers } from '../utils/MidiNumbers';

export type KeyColor = string | { backgroundColor: string; color?: string };

export interface KeyProps {
  midiNumber: number;
  naturalKeyWidth: number; // Width as a ratio between 0 and 1
  gliss?: boolean;
  useTouchEvents?: boolean;
  accidental?: boolean;
  active?: boolean;
  disabled?: boolean;
  onPlayNoteInput: (midiNumber: number) => void;
  onStopNoteInput: (midiNumber: number) => void;
  accidentalWidthRatio?: number;
  pitchPositions?: { [pitch: string]: number };
  noteRange: { first: number; last: number };
  label?: ReactNode;
  keyColor?: KeyColor;
}

const defaultPitchPositions = {
  C: 0,
  Db: 0.55,
  D: 1,
  Eb: 1.8,
  E: 2,
  F: 3,
  Gb: 3.5,
  G: 4,
  Ab: 4.7,
  A: 5,
  Bb: 5.85,
  B: 6,
};

function ratioToPercentage(ratio: number) {
  return `${ratio * 100}%`;
}

export const Key = (props: KeyProps) => {
  const {
    midiNumber,
    naturalKeyWidth,
    gliss = false,
    useTouchEvents = false,
    accidental = false,
    active = false,
    disabled = false,
    onPlayNoteInput,
    onStopNoteInput,
    accidentalWidthRatio = 0.55,
    pitchPositions = defaultPitchPositions,
    noteRange,
    label,
    keyColor,
  } = props;

  const getAbsoluteKeyPosition = (midiNumber: number) => {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = pitchPositions[pitchName as keyof typeof pitchPositions];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  };

  const getRelativeKeyPosition = (midiNumber: number) => {
    return (
      getAbsoluteKeyPosition(midiNumber) -
      getAbsoluteKeyPosition(noteRange.first)
    );
  };

  const handlePlayNoteInput = useCallback(() => {
    onPlayNoteInput(midiNumber);
  }, [onPlayNoteInput, midiNumber]);

  const handleStopNoteInput = useCallback(() => {
    onStopNoteInput(midiNumber);
  }, [onStopNoteInput, midiNumber]);

  const backgroundColor = typeof keyColor === 'string' ? keyColor : keyColor?.backgroundColor;
  const color = typeof keyColor === 'object' && keyColor.color;

  // Need to conditionally include/exclude handlers based on useTouchEvents,
  // because otherwise mobile taps double fire events.
  return (
    <div
      className={classNames('ReactPiano__Key', {
        'ReactPiano__Key--accidental': accidental,
        'ReactPiano__Key--natural': !accidental,
        'ReactPiano__Key--disabled': disabled,
        'ReactPiano__Key--active': active,
      })}
      style={{
        left: ratioToPercentage(getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
        width: ratioToPercentage(
          accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth,
        ),
        backgroundColor,
      }}
      onMouseDown={useTouchEvents ? undefined : handlePlayNoteInput}
      onMouseUp={useTouchEvents ? undefined : handleStopNoteInput}
      onMouseEnter={gliss ? handlePlayNoteInput : undefined}
      onMouseLeave={handleStopNoteInput}
      onTouchStart={useTouchEvents ? handlePlayNoteInput : undefined}
      onTouchCancel={useTouchEvents ? handleStopNoteInput : undefined}
      onTouchEnd={useTouchEvents ? handleStopNoteInput : undefined}
    >
      {!disabled && (
        <div className="ReactPiano__NoteLabelContainer">
          <div
            className={classNames('ReactPiano__NoteLabel', {
              'ReactPiano__NoteLabel--active': active,
              'ReactPiano__NoteLabel--accidental': accidental,
              'ReactPiano__NoteLabel--natural': !accidental,
            })}
            style={color ? { color } : {}}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
};
