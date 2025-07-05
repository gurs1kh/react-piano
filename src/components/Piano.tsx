import React from 'react';
import { ControlledPiano, ControlledPianoProps } from './ControlledPiano';

export interface PianoProps extends Omit<ControlledPianoProps, 'activeNotes' | 'onPlayNoteInput' | 'onStopNoteInput'> {
  activeNotes?: number[];
  onPlayNoteInput?: (midiNumber: number, options: { prevActiveNotes: number[] }) => void;
  onStopNoteInput?: (midiNumber: number, options: { prevActiveNotes: number[] }) => void;
}

interface PianoState {
  activeNotes: number[];
}

export class Piano extends React.Component<PianoProps, PianoState> {
  constructor(props: PianoProps) {
    super(props);
    this.state = {
      activeNotes: props.activeNotes || [],
    };
  }

  componentDidUpdate(prevProps: PianoProps) {
    // Make activeNotes "controllable" by using internal
    // state by default, but allowing prop overrides.
    if (
      prevProps.activeNotes !== this.props.activeNotes &&
      this.state.activeNotes !== this.props.activeNotes
    ) {
      this.setState({
        activeNotes: this.props.activeNotes || [],
      });
    }
  }

  handlePlayNoteInput = (midiNumber: number) => {
    this.setState((prevState) => {
      if (this.props.onPlayNoteInput) {
        this.props.onPlayNoteInput(midiNumber, { prevActiveNotes: prevState.activeNotes });
      }
      if (prevState.activeNotes.includes(midiNumber)) {
        return null;
      }
      return {
        activeNotes: prevState.activeNotes.concat(midiNumber),
      };
    });
  };

  handleStopNoteInput = (midiNumber: number) => {
    this.setState((prevState) => {
      if (this.props.onStopNoteInput) {
        this.props.onStopNoteInput(midiNumber, { prevActiveNotes: this.state.activeNotes });
      }
      return {
        activeNotes: prevState.activeNotes.filter((note) => midiNumber !== note),
      };
    });
  };

  render() {
    return (
      <ControlledPiano
        {...this.props}
        activeNotes={this.state.activeNotes}
        onPlayNoteInput={this.handlePlayNoteInput}
        onStopNoteInput={this.handleStopNoteInput}
      />
    );
  }
}
