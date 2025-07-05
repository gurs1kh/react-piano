import React from 'react';
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
  }) => React.ReactNode;
  className?: string;
  disabled?: boolean;
  width?: number;
  keyWidthToHeight?: number;
  keyboardShortcuts?: Array<{
    key: string;
    midiNumber: number;
  }>;
}

export class ControlledPiano extends React.Component<ControlledPianoProps> {
  static defaultProps: Partial<ControlledPianoProps> = {
    renderNoteLabel: ({ keyboardShortcut, isActive, isAccidental }) =>
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
      ) : null,
  };

  state = {
    isMouseDown: false,
    useTouchEvents: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  componentDidUpdate(prevProps: ControlledPianoProps) {
    if (this.props.activeNotes !== prevProps.activeNotes) {
      this.handleNoteChanges({
        prevActiveNotes: prevProps.activeNotes || [],
        nextActiveNotes: this.props.activeNotes || [],
      });
    }
  }

  handleNoteChanges = ({
    prevActiveNotes,
    nextActiveNotes,
  }: {
    prevActiveNotes: number[];
    nextActiveNotes: number[];
  }) => {
    if (this.props.disabled) {
      return;
    }
    const notesStopped = difference(prevActiveNotes, nextActiveNotes);
    const notesStarted = difference(nextActiveNotes, prevActiveNotes);
    notesStarted.forEach((midiNumber) => {
      this.props.playNote(midiNumber);
    });
    notesStopped.forEach((midiNumber) => {
      this.props.stopNote(midiNumber);
    });
  };

  getMidiNumberForKey = (key: string): number | null => {
    if (!this.props.keyboardShortcuts) {
      return null;
    }
    const shortcut = this.props.keyboardShortcuts.find((sh) => sh.key === key);
    return shortcut ? shortcut.midiNumber : null;
  };

  getKeyForMidiNumber = (midiNumber: number): string | null => {
    if (!this.props.keyboardShortcuts) {
      return null;
    }
    const shortcut = this.props.keyboardShortcuts.find((sh) => sh.midiNumber === midiNumber);
    return shortcut ? shortcut.key : null;
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const midiNumber = this.getMidiNumberForKey(event.key);
    if (midiNumber) {
      this.onPlayNoteInput(midiNumber);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    const midiNumber = this.getMidiNumberForKey(event.key);
    if (midiNumber) {
      this.onStopNoteInput(midiNumber);
    }
  };

  onPlayNoteInput = (midiNumber: number) => {
    if (this.props.disabled) {
      return;
    }
    this.props.onPlayNoteInput(midiNumber, this.props.activeNotes);
  };

  onStopNoteInput = (midiNumber: number) => {
    if (this.props.disabled) {
      return;
    }
    this.props.onStopNoteInput(midiNumber, this.props.activeNotes);
  };

  onMouseDown = () => {
    this.setState({
      isMouseDown: true,
    });
  };

  onMouseUp = () => {
    this.setState({
      isMouseDown: false,
    });
  };

  onTouchStart = () => {
    this.setState({
      useTouchEvents: true,
    });
  };

  renderNoteLabel = ({
    midiNumber,
    isActive,
    isAccidental,
  }: {
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }) => {
    const keyboardShortcut = this.getKeyForMidiNumber(midiNumber);
    return this.props.renderNoteLabel &&
      this.props.renderNoteLabel({ keyboardShortcut, midiNumber, isActive, isAccidental });
  };

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        data-testid="container"
      >
        <Keyboard
          noteRange={this.props.noteRange}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={this.props.activeNotes}
          className={this.props.className}
          disabled={this.props.disabled}
          width={this.props.width}
          keyWidthToHeight={this.props.keyWidthToHeight}
          gliss={this.state.isMouseDown}
          useTouchEvents={this.state.useTouchEvents}
          renderNoteLabel={this.renderNoteLabel}
        />
      </div>
    );
  }
}
