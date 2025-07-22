type Notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
type Accidentals = ['#', 'b', ''];
type Octaves = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export type Note = `${Notes[number]}${Accidentals[number]}${Octaves[number]}`;
declare function fromNote(note: Note): number;
declare function getAttributes(midiNumber: number): {
    note: string;
    pitchName: string;
    octave: number;
    midiNumber: number;
    isAccidental: boolean;
};
export declare const MidiNumbers: {
    fromNote: typeof fromNote;
    getAttributes: typeof getAttributes;
    MIN_MIDI_NUMBER: number;
    MAX_MIDI_NUMBER: number;
    NATURAL_MIDI_NUMBERS: number[];
};
export {};
