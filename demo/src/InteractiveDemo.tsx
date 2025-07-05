import { useState } from 'react';
import { SoundfontPiano, KeyboardShortcuts, MidiNumbers, useInstrumentList, InstrumentName } from 'react-piano';
import { MdArrowDownward } from 'react-icons/md';
import useDimensions from 'react-use-dimensions';
import { PianoConfig } from './PianoConfig';

interface InteractiveDemoProps {
}

export const InteractiveDemo = (_props: InteractiveDemoProps) => {
  const { instrumentList } = useInstrumentList();
  const [instrumentName, setInstrumentName] = useState<InstrumentName>('acoustic_grand_piano');
  const [noteRange, setNoteRange] = useState({
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  });
  const [keyboardShortcutOffset, setKeyboardShortcutOffset] = useState(0);

  const [dimensionsRef, { width: containerWidth }] = useDimensions();

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first + keyboardShortcutOffset,
    lastNote: noteRange.last + keyboardShortcutOffset,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div>
      <div className="text-center">
        <p className="">Try it by clicking, tapping, or using your keyboard:</p>
        <div style={{ color: '#777' }}>
          <MdArrowDownward size={32} />
        </div>
      </div>
      <div className="mt-4" ref={dimensionsRef}>
        <SoundfontPiano
          instrumentName={instrumentName}
          noteRange={noteRange}
          keyboardShortcuts={keyboardShortcuts}
          width={containerWidth}
        />
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          <PianoConfig
            instrumentName={instrumentName}
            noteRange={noteRange}
            keyboardShortcutOffset={keyboardShortcutOffset}
            onChangeInstrumentName={(instrumentName) => {
              setInstrumentName(instrumentName);
              // stopAllNotes();
            }}
            onChangeNoteRange={(noteRange) => {
              setNoteRange(noteRange);
              // stopAllNotes();
            }}
            onChangeKeyboardShortcutOffset={(keyboardShortcutOffset) => {
              setKeyboardShortcutOffset(keyboardShortcutOffset);
              // stopAllNotes();
            }}
            instrumentList={instrumentList || [instrumentName]}
            keyboardShortcuts={keyboardShortcuts}
          />
        </div>
      </div>
    </div>
  );
}
