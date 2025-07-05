import { InstrumentName } from 'soundfont-player';
import { Piano, PianoProps } from './Piano';
import { useSoundfont } from '../hooks';
import { useCallback } from 'react';

interface SoundfontPianoProps extends Omit<PianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote'> {
  width: number;
  instrumentName?: InstrumentName;
  audioContext?: AudioContext;
  soundfontHostname?: string;
  onPlayNote?: (midiNumber: number) => void;
  onStopNote?: (midiNumber: number) => void;
}

export const SoundfontPiano = (props: SoundfontPianoProps) => {
  const {
    width,
    instrumentName,
    noteRange,
    audioContext,
    soundfontHostname,
    keyboardShortcuts,
    disabled = false,
    onPlayNote = () => 0,
    onStopNote = () => 0,
  } = props;

  const { playNote, stopNote, isLoading } = useSoundfont({
    audioContext,
    instrumentName,
    hostname: soundfontHostname,
  });

  const playNoteCallback = useCallback((midiNumber: number) => {
    onPlayNote(midiNumber);
    playNote(midiNumber);
  }, [onPlayNote, playNote]);

  const stopNoteCallback = useCallback((midiNumber: number) => {
    onStopNote(midiNumber);
    stopNote(midiNumber);
  }, [onStopNote, stopNote]);

  return (
    <Piano
      noteRange={noteRange}
      keyboardShortcuts={keyboardShortcuts}
      playNote={playNoteCallback}
      stopNote={stopNoteCallback}
      disabled={isLoading || disabled}
      width={width}
    />
  );
}
