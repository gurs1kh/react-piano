import { useEffect, useRef } from "react";
import SimpleMidiInput from "simple-midi-input";

interface UseMidiInputParams {
  onAddActiveNote?: (midiNumber: number) => void;
  onRemoveActiveNote?: (midiNumber: number) => void;
}

export const useMidiInput = (params: UseMidiInputParams) => {
  const {
    onAddActiveNote = () => 0,
    onRemoveActiveNote = () => 0,
  } = params;

  const smiRef = useRef<SimpleMidiInput>(new SimpleMidiInput());
  const activeNotesRef = useRef<number[]>([]);

  useEffect(() => {
    const smi = smiRef.current;
    type SMIEventData = Parameters<Parameters<typeof smi.on>[1]>[0];

    const handleNoteOn = (data: SMIEventData) => {
      if (activeNotesRef.current.includes(data.key)) return;
      activeNotesRef.current.push(data.key);
      onAddActiveNote(data.key);
    };

    const handleNoteOff = (data: SMIEventData) => {
      activeNotesRef.current = activeNotesRef.current.filter(n => n !== data.key);
      onRemoveActiveNote(data.key);
    };

    smi.on('noteOn', handleNoteOn);
    smi.on('noteOff', handleNoteOff);

    navigator.requestMIDIAccess().then((midi) => smi.attach(midi));

    return () => {
      smi.off('noteOn', handleNoteOn);
      smi.off('noteOff', handleNoteOff);
      smi.detach();
    };
  }, [onAddActiveNote, onRemoveActiveNote])
}
