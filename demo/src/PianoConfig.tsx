import React, { useEffect, useCallback } from 'react';
import { MidiNumbers, InstrumentName } from 'react-piano';
import { AutoblurSelect } from './AutoBlurSelect';

interface PianoConfigProps {
  instrumentName: InstrumentName;
  noteRange: { first: number; last: number; };
  keyboardShortcutOffset: number;
  onChangeInstrumentName: (name: InstrumentName) => void;
  onChangeNoteRange: (range: { first: number; last: number }) => void;
  onChangeKeyboardShortcutOffset: (offset: number) => void;
  instrumentList: string[];
  keyboardShortcuts: any[];
}

export const PianoConfig: React.FC<PianoConfigProps> = (props: PianoConfigProps) => {
  const {
    instrumentName,
    noteRange,
    keyboardShortcutOffset,
    onChangeInstrumentName,
    onChangeNoteRange,
    onChangeKeyboardShortcutOffset,
    instrumentList,
    keyboardShortcuts,
  } = props

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const delta = {
        ArrowLeft: -1,
        ArrowRight: 1,
      }[event.key] || 0;

      if (delta === 0) return;

      const numNotes = noteRange.last - noteRange.first + 1;
      const minOffset = 0;
      const maxOffset = numNotes - keyboardShortcuts.length;

      const newOffset = Math.max(
        minOffset,
        Math.min(
          maxOffset,
          keyboardShortcutOffset + delta
        )
      );

      onChangeKeyboardShortcutOffset(newOffset);
    },
    [noteRange, keyboardShortcutOffset, keyboardShortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
