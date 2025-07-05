import { useCallback, useEffect, useState } from "react";
import { KeyboardShortcuts } from "../utils";
import { NoteRange, useNoteRange } from "./useNoteRange";

interface UseKeyboardShortcutsParams {
  noteRange: NoteRange;
  initialOffset?: number;
}

export const useKeyboardShortcuts = ({ noteRange: noteRangeProp, initialOffset = 0 }: UseKeyboardShortcutsParams) => {
  const { noteRange } = useNoteRange(noteRangeProp);
  const [offset, setOffset] = useState(initialOffset);

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first + offset,
    lastNote: noteRange.last + offset,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

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
          offset + delta
        )
      );

      setOffset(newOffset);
    },
    [noteRange, offset, keyboardShortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    keyboardShortcuts,
  };
}
