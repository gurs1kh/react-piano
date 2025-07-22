import { ControlledPianoProps } from './ControlledPiano';
export interface PianoProps extends Omit<ControlledPianoProps, 'activeNotes' | 'onPlayNoteInput' | 'onStopNoteInput'> {
    activeNotes?: number[];
    onPlayNoteInput?: (midiNumber: number, options: {
        prevActiveNotes: number[];
    }) => void;
    onStopNoteInput?: (midiNumber: number, options: {
        prevActiveNotes: number[];
    }) => void;
}
export declare const Piano: (props: PianoProps) => import("react/jsx-runtime").JSX.Element;
