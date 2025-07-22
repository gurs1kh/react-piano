import { Note } from '../utils';
export type NoteRange = {
    first: number;
    last: number;
} | {
    first: Note;
    last: Note;
};
export declare const useNoteRange: (noteRangeProp: NoteRange) => {
    noteRange: {
        first: number;
        last: number;
    };
};
