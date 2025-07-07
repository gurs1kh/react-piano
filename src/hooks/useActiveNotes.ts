import { useState } from "react";

export const useActiveNotes = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);

  const addActiveNote = (midiNumber: number) => {
    if (activeNotes.includes(midiNumber)) return;

    setActiveNotes((prev) => [...prev, midiNumber]);
  };

  const removeActiveNote = (midiNumber: number) => {
    setActiveNotes((prev) => prev.filter((note) => note !== midiNumber));
  };

  return {
    activeNotes,
    addActiveNote,
    removeActiveNote,
  };
  
}
