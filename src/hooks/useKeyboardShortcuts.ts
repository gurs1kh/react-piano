import { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardShortcuts } from "../utils";
import { NoteRange, useNoteRange } from "./useNoteRange";

interface UseKeyboardShortcutsParams {
  noteRange: NoteRange;
  initialOffset?: number;
  onAddActiveNote?: (midiNumber: number) => void;
  onRemoveActiveNote?: (midiNumber: number) => void;
}

export const useKeyboardShortcuts = (props: UseKeyboardShortcutsParams) => {
  const {
    noteRange: noteRangeProp,
    initialOffset = 0,
    onAddActiveNote = () => 0,
    onRemoveActiveNote = () => 0,
  } = props;

  const { noteRange } = useNoteRange(noteRangeProp);
  const [offset, setOffset] = useState(initialOffset);

  const keyboardShortcuts = useMemo(() => {
    return KeyboardShortcuts.create({
      firstNote: noteRange.first + offset,
      lastNote: noteRange.last + offset,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
  }, [noteRange, offset]);

  const handleOffsetKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const delta = {
        ArrowLeft: -1,
        ArrowRight: 1,
      }[event.key] || 0;

      if (delta === 0) return;

      const numNotes = noteRange.last - noteRange.first + 1;
      const minOffset = 0;
      const maxOffset = numNotes - Object.keys(keyboardShortcuts).length;

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

  const getMidiNumberForKey = useCallback((key: string) => {
    if (!keyboardShortcuts) return null;

    const midiNumberKey = Object.keys(keyboardShortcuts)
      .find(midiNumberKey => keyboardShortcuts[Number(midiNumberKey)] === key);
    return midiNumberKey ? Number(midiNumberKey) : null;
  }, [keyboardShortcuts]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      const midiNumber = getMidiNumberForKey(event.key);
      if (!midiNumber) return;

      onAddActiveNote(midiNumber);
    },
    [getMidiNumberForKey, onAddActiveNote]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const midiNumber = getMidiNumberForKey(event.key);
      if (!midiNumber) return;

      onRemoveActiveNote(midiNumber);
    },
    [getMidiNumberForKey, onRemoveActiveNote]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keyup', handleOffsetKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keyup', handleOffsetKeyDown);
    };
  }, [handleKeyDown, handleKeyUp, handleOffsetKeyDown]);

  return {
    keyboardShortcuts,
  };
}
