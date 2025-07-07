import { useState } from 'react';
import { SoundfontPiano, MidiNumbers, useInstrumentList, InstrumentName } from 'react-piano';
import { MdArrowDownward } from 'react-icons/md';
import useDimensions from 'react-use-dimensions';
import { PianoConfig } from '../components/PianoConfig';

export const InteractiveDemo = () => {
  const { instrumentList } = useInstrumentList();
  const [instrumentName, setInstrumentName] = useState<InstrumentName>('acoustic_grand_piano');
  const [noteRange, setNoteRange] = useState({
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  });
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const [dimensionsRef, { width: containerWidth }] = useDimensions();

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
          activeNotes={activeNotes}
          onChangeActiveNotes={setActiveNotes}
          instrumentName={instrumentName}
          noteRange={noteRange}
          width={containerWidth}
        />
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          <PianoConfig
            instrumentName={instrumentName}
            noteRange={noteRange}
            onChangeInstrumentName={setInstrumentName}
            onChangeNoteRange={setNoteRange}
            instrumentList={instrumentList || [instrumentName]}
          />
        </div>
      </div>
    </div>
  );
}
