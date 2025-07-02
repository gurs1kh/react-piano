import React from 'react';
import classNames from 'classnames';

import { MidiNumbers } from './MidiNumbers';

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
  children?: React.ReactNode;
}

function ratioToPercentage(ratio: number) {
  return `${ratio * 100}%`;
}

export class Key extends React.Component<KeyProps> {
  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
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
    },
  };

  onPlayNoteInput = () => {
    this.props.onPlayNoteInput(this.props.midiNumber);
  };

  onStopNoteInput = () => {
    this.props.onStopNoteInput(this.props.midiNumber);
  };

  // Key position is represented by the number of natural key widths from the left
  getAbsoluteKeyPosition(midiNumber: number) {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPositions = this.props.pitchPositions || Key.defaultProps.pitchPositions;
    const pitchPosition = pitchPositions[pitchName as keyof typeof pitchPositions];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber: number) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio = 0.65,
      midiNumber,
      gliss,
      useTouchEvents,
      accidental,
      active,
      disabled,
      children,
    } = this.props;

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
          left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
          width: ratioToPercentage(
            accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth,
          ),
        }}
        onMouseDown={useTouchEvents ? undefined : this.onPlayNoteInput}
        onMouseUp={useTouchEvents ? undefined : this.onStopNoteInput}
        onMouseEnter={gliss ? this.onPlayNoteInput : undefined}
        onMouseLeave={this.onStopNoteInput}
        onTouchStart={useTouchEvents ? this.onPlayNoteInput : undefined}
        onTouchCancel={useTouchEvents ? this.onStopNoteInput : undefined}
        onTouchEnd={useTouchEvents ? this.onStopNoteInput : undefined}
      >
        <div className="ReactPiano__NoteLabelContainer">{children}</div>
      </div>
    );
  }
}
