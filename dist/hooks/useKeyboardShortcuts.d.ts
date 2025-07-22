import { NoteRange } from './useNoteRange';
interface UseKeyboardShortcutsParams {
    noteRange: NoteRange;
    initialOffset?: number;
    onAddActiveNote?: (midiNumber: number) => void;
    onRemoveActiveNote?: (midiNumber: number) => void;
}
export declare const useKeyboardShortcuts: (props: UseKeyboardShortcutsParams) => {
    keyboardShortcuts: Record<number, string>;
};
export {};
