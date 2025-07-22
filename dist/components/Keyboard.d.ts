import { KeyColor } from './Key';
export interface KeyboardProps {
    noteRange: {
        first: number;
        last: number;
    };
    activeNotes: number[];
    onPlayNoteInput: (midiNumber: number) => void;
    onStopNoteInput: (midiNumber: number) => void;
    keyWidthToHeight?: number;
    className?: string;
    disabled?: boolean;
    gliss?: boolean;
    useTouchEvents?: boolean;
    width?: number;
    disableActiveStying?: boolean;
    keyLabels?: Record<number, string>;
    keyColors?: Record<number, KeyColor>;
}
export declare const Keyboard: (props: KeyboardProps) => import("react/jsx-runtime").JSX.Element;
