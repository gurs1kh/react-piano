import { MidiNumbers, InstrumentName } from 'react-piano';
import { AutoblurSelect } from './AutoBlurSelect';

interface PianoConfigProps {
  instrumentName: InstrumentName;
  noteRange: { first: number; last: number; };
  onChangeInstrumentName: (name: InstrumentName) => void;
  onChangeNoteRange: (range: { first: number; last: number }) => void;
  instrumentList: string[];
}

export const PianoConfig = (props: PianoConfigProps) => {
  const {
    instrumentName,
    noteRange,
    onChangeInstrumentName,
    onChangeNoteRange,
    instrumentList,
  } = props;

  const onChangeFirstNote = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeNoteRange({
      first: parseInt(event.target.value, 10),
      last: noteRange.last,
    })
  };

  const onChangeLastNote = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeNoteRange({
      first: noteRange.first,
      last: parseInt(event.target.value, 10),
    });
  };

  const midiNumbersToNotes: { [midi: number]: string } = MidiNumbers.NATURAL_MIDI_NUMBERS.reduce(
    (obj: { [midi: number]: string }, midiNumber: number) => {
      obj[midiNumber] = MidiNumbers.getAttributes(midiNumber).note;
      return obj;
    },
    {}
  );

  return (
    <div className="form-row">
      <div className="col-3">
        <small className="mb-1 text-muted">First note</small>
        <AutoblurSelect
          className="form-control"
          onChange={onChangeFirstNote}
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
        <small className="mb-1 text-muted">Last note</small>
        <AutoblurSelect
          className="form-control"
          onChange={onChangeLastNote}
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
        <small className="mb-1 text-muted">Instrument</small>
        <AutoblurSelect
          className="form-control"
          value={instrumentName}
          onChange={(e) => onChangeInstrumentName(e.target.value as InstrumentName)}
        >
          {instrumentList.map((value) => (
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
};
