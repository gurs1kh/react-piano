import React from 'react';
import range from 'just-range';
import classNames from 'classnames';

import { Key } from './Key';
import { MidiNumbers } from '../utils/MidiNumbers';

export interface KeyboardProps {
  noteRange: {
    first: number;
    last: number;
  };
  activeNotes: number[];
  onPlayNoteInput: (midiNumber: number) => void;
  onStopNoteInput: (midiNumber: number) => void;
  renderNoteLabel: (params: {
    isActive: boolean;
    isAccidental: boolean;
    midiNumber: number;
  }) => React.ReactNode;
  keyWidthToHeight?: number;
  className?: string;
  disabled?: boolean;
  gliss?: boolean;
  useTouchEvents?: boolean;
  width?: number;
}

export class Keyboard extends React.Component<KeyboardProps> {
  static defaultProps = {
    disabled: false,
    gliss: false,
    useTouchEvents: false,
    keyWidthToHeight: 0.33,
    renderNoteLabel: () => null,
    activeNotes: [],
  };

  // Range of midi numbers on keyboard
  getMidiNumbers() {
    return range(this.props.noteRange.first, this.props.noteRange.last + 1);
  }

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter((number: number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  // Returns a ratio between 0 and 1
  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount();
  }

  getWidth() {
    return this.props.width ? this.props.width : '100%';
  }

  getHeight() {
    if (!this.props.width) {
      return '100%';
    }
    const keyWidth = this.props.width * this.getNaturalKeyWidth();
    return `${keyWidth / (this.props.keyWidthToHeight || 0.33)}px`;
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth();
    return (
      <div
        className={classNames('ReactPiano__Keyboard', this.props.className)}
        style={{ width: this.getWidth(), height: this.getHeight() }}
      >
        {this.getMidiNumbers().map((midiNumber: number) => {
          const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
          const isActive =
            !this.props.disabled && this.props.activeNotes.includes(midiNumber);
          return (
            <Key
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={this.props.noteRange}
              active={isActive}
              accidental={isAccidental}
              disabled={this.props.disabled}
              onPlayNoteInput={this.props.onPlayNoteInput}
              onStopNoteInput={this.props.onStopNoteInput}
              gliss={this.props.gliss}
              useTouchEvents={this.props.useTouchEvents}
              key={midiNumber}
            >
              {this.props.disabled
                ? null
                : this.props.renderNoteLabel({
                    isActive,
                    isAccidental,
                    midiNumber,
                  })}
            </Key>
          );
        })}
      </div>
    );
  }
}

