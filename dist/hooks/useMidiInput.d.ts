interface UseMidiInputParams {
    enableMidiInput?: boolean;
    onAddActiveNote?: (midiNumber: number) => void;
    onRemoveActiveNote?: (midiNumber: number) => void;
}
export declare const useMidiInput: (params: UseMidiInputParams) => void;
export {};
