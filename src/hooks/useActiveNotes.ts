import { useCallback, useState } from "react";

export const useActiveNotes = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);

  const addActiveNote = useCallback((midiNumber: number) => {
    setActiveNotes((prev) => {
      if (prev.includes(midiNumber)) return prev;

      return [...prev, midiNumber];
    });
  }, []);

  const removeActiveNote = useCallback((midiNumber: number) => {
    setActiveNotes((prev) => prev.filter((note) => note !== midiNumber));
  }, []);

  return {
    activeNotes,
    addActiveNote,
    removeActiveNote,
  };
  
}
