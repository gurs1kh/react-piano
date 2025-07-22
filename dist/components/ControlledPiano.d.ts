import { KeyColor } from './Key';
export interface ControlledPianoProps {
    noteRange: {
        first: number;
        last: number;
    };
    activeNotes?: number[];
    onAddActiveNote?: (midiNumber: number) => void;
    onRemoveActiveNote?: (midiNumber: number) => void;
    className?: string;
    disabled?: boolean;
    disableActiveStying?: boolean;
    width?: number;
    keyWidthToHeight?: number;
    keyLabels?: Record<number, string>;
    keyColors?: Record<number, KeyColor>;
}
export declare const ControlledPiano: (props: ControlledPianoProps) => import("react/jsx-runtime").JSX.Element;
