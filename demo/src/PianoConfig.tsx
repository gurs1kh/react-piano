import React from 'react';
import { MidiNumbers } from 'react-piano';
import { InstrumentName } from 'soundfont-player';

interface PianoConfigProps {
  config: {
    noteRange: {
      first: number;
      last: number;
    };
    instrumentName: InstrumentName;
    keyboardShortcutOffset: number;
  };
  setConfig: (config: Partial<PianoConfigProps['config']>) => void;
  instrumentList: string[];
  keyboardShortcuts: any[];
}

interface AutoblurSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

class AutoblurSelect extends React.Component<AutoblurSelectProps> {
  selectRef = React.createRef<HTMLSelectElement>();

  onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event);
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };

  render() {
    const { children, onChange, ...otherProps } = this.props;
    return (
      <select {...otherProps} onChange={this.onChange} ref={this.selectRef}>
        {children}
      </select>
    );
  }
}

const Label: React.FC<{ children: React.ReactNode }> = (props) => (
  <small className="mb-1 text-muted">{props.children}</small>
);

class PianoConfig extends React.Component<PianoConfigProps> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const numNotes =
      this.props.config.noteRange.last - this.props.config.noteRange.first + 1;
    const minOffset = 0;
    const maxOffset = numNotes - this.props.keyboardShortcuts.length;
    if (event.key === 'ArrowLeft') {
      const reducedOffset = this.props.config.keyboardShortcutOffset - 1;
      if (reducedOffset >= minOffset) {
        this.props.setConfig({
          keyboardShortcutOffset: reducedOffset,
        });
      }
    } else if (event.key === 'ArrowRight') {
      const increasedOffset = this.props.config.keyboardShortcutOffset + 1;
      if (increasedOffset <= maxOffset) {
        this.props.setConfig({
          keyboardShortcutOffset: increasedOffset,
        });
      }
    }
  };

  onChangeFirstNote = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setConfig({
      noteRange: {
        first: parseInt(event.target.value, 10),
        last: this.props.config.noteRange.last,
      },
    });
  };

  onChangeLastNote = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setConfig({
      noteRange: {
        first: this.props.config.noteRange.first,
        last: parseInt(event.target.value, 10),
      },
    });
  };

  onChangeInstrument = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setConfig({
      instrumentName: event.target.value as InstrumentName,
    });
  };

  render() {
    const midiNumbersToNotes: { [midi: number]: string } = MidiNumbers.NATURAL_MIDI_NUMBERS.reduce(
      (obj: { [midi: number]: string }, midiNumber: number) => {
        obj[midiNumber] = MidiNumbers.getAttributes(midiNumber).note;
        return obj;
      },
      {}
    );
    const { noteRange, instrumentName } = this.props.config;

    return (
      <div className="form-row">
        <div className="col-3">
          <Label>First note</Label>
          <AutoblurSelect
            className="form-control"
            onChange={this.onChangeFirstNote}
            value={noteRange.first}
          >
            {MidiNumbers.NATURAL_MIDI_NUMBERS.map((midiNumber: number) => (
              <option value={midiNumber} disabled={midiNumber >= noteRange.last} key={midiNumber}>
                {midiNumbersToNotes[midiNumber]}
              </option>
            ))}
          </AutoblurSelect>
        </div>
        <div className="col-3">
          <Label>Last note</Label>
          <AutoblurSelect
            className="form-control"
            onChange={this.onChangeLastNote}
            value={noteRange.last}
          >
            {MidiNumbers.NATURAL_MIDI_NUMBERS.map((midiNumber: number) => (
              <option value={midiNumber} disabled={midiNumber <= noteRange.first} key={midiNumber}>
                {midiNumbersToNotes[midiNumber]}
              </option>
            ))}
          </AutoblurSelect>
        </div>
        <div className="col-6">
          <Label>Instrument</Label>
          <AutoblurSelect
            className="form-control"
            value={instrumentName}
            onChange={this.onChangeInstrument}
          >
            {this.props.instrumentList.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </AutoblurSelect>
        </div>
        <div className="col mt-2">
          <small className="text-muted">
            Use <strong>left arrow</strong> and <strong>right arrow</strong> to move the keyboard
            shortcuts around.
          </small>
        </div>
      </div>
    );
  }
}

export default PianoConfig;
