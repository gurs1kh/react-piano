import { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { MdArrowDownward } from 'react-icons/md';

import DimensionsProvider from './DimensionsProvider';
import InstrumentListProvider from './InstrumentListProvider';
import SoundfontProvider from './SoundfontProvider';
import PianoConfig from './PianoConfig';
import { InstrumentName } from 'soundfont-player';

interface InteractiveDemoProps {
  audioContext: AudioContext;
  soundfontHostname: string;
}

const InteractiveDemo = ({ audioContext, soundfontHostname }: InteractiveDemoProps) => {
  const [instrumentName, setInstrumentName] = useState<InstrumentName>('acoustic_grand_piano');
  const [noteRange, setNoteRange] = useState({
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  });
  const [keyboardShortcutOffset, setKeyboardShortcutOffset] = useState(0);

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first + keyboardShortcutOffset,
    lastNote: noteRange.last + keyboardShortcutOffset,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <SoundfontProvider
      audioContext={audioContext}
      instrumentName={instrumentName}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote, stopAllNotes }) => (
        <div>
          <div className="text-center">
            <p className="">Try it by clicking, tapping, or using your keyboard:</p>
            <div style={{ color: '#777' }}>
              <MdArrowDownward size={32} />
            </div>
          </div>
          <div className="mt-4">
            <DimensionsProvider>
              {({ containerWidth }) => (
                <Piano
                  noteRange={noteRange}
                  keyboardShortcuts={keyboardShortcuts}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  width={containerWidth}
                />
              )}
            </DimensionsProvider>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8 offset-lg-2">
              <InstrumentListProvider
                hostname={soundfontHostname}
                render={(instrumentList) => (
                  <PianoConfig
                    config={{ noteRange, instrumentName, keyboardShortcutOffset }}
                    setConfig={({ noteRange, instrumentName, keyboardShortcutOffset }) => {
                      if (instrumentName) setInstrumentName(instrumentName);
                      if (noteRange) setNoteRange(noteRange);
                      if (keyboardShortcutOffset) setKeyboardShortcutOffset(keyboardShortcutOffset);
                      stopAllNotes();
                    }}
                    instrumentList={instrumentList || [instrumentName]}
                    keyboardShortcuts={keyboardShortcuts}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default InteractiveDemo;
