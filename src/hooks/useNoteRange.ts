import { useMemo } from "react";
import { MidiNumbers, Note } from "../utils";

export type NoteRange = {
  first: number;
  last: number;
} | {
  first: Note;
  last: Note;
};

export const useNoteRange = (noteRangeProp: NoteRange) => {
  const noteRange = useMemo(() => {
    return (typeof noteRangeProp.first === 'number')
      ? { first: noteRangeProp.first, last: noteRangeProp.last }
      : {
        first: MidiNumbers.fromNote(noteRangeProp.first),
        last: MidiNumbers.fromNote(noteRangeProp.last),
      };
  }, [noteRangeProp.first, noteRangeProp.last]);

  return { noteRange };
}
