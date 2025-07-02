import { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { MdArrowDownward } from 'react-icons/md';
import useDimensions from 'react-use-dimensions';
import { useSoundfont } from './hooks/useSoundfont';
import { InstrumentListProvider } from './InstrumentListProvider';
import { PianoConfig } from './PianoConfig';
import { InstrumentName } from 'soundfont-player';

interface InteractiveDemoProps {
  audioContext: AudioContext;
  soundfontHostname: string;
}

export const InteractiveDemo = ({ audioContext, soundfontHostname }: InteractiveDemoProps) => {
  const [instrumentName, setInstrumentName] = useState<InstrumentName>('acoustic_grand_piano');
  const [noteRange, setNoteRange] = useState({
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  });
  const [keyboardShortcutOffset, setKeyboardShortcutOffset] = useState(0);

  const [dimensionsRef, { width: containerWidth }] = useDimensions();
  const { playNote, stopNote, stopAllNotes, isLoading } = useSoundfont({
    audioContext,
    instrumentName,
    hostname: soundfontHostname,
  });

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
        <Piano
          noteRange={noteRange}
          keyboardShortcuts={keyboardShortcuts}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
          width={containerWidth}
        />
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          <InstrumentListProvider
            hostname={soundfontHostname}
            render={(instrumentList) => (
              <PianoConfig
                instrumentName={instrumentName}
                noteRange={noteRange}
                keyboardShortcutOffset={keyboardShortcutOffset}
                onChangeInstrumentName={(instrumentName) => {
                  setInstrumentName(instrumentName);
                  stopAllNotes();
                }}
                onChangeNoteRange={(noteRange) => {
                  setNoteRange(noteRange);
                  stopAllNotes();
                }}
                onChangeKeyboardShortcutOffset={(keyboardShortcutOffset) => {
                  setKeyboardShortcutOffset(keyboardShortcutOffset);
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
  );
}
