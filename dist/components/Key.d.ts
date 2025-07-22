import { ReactNode } from 'react';
export type KeyColor = string | {
    backgroundColor: string;
    color?: string;
};
export interface KeyProps {
    midiNumber: number;
    naturalKeyWidth: number;
    gliss?: boolean;
    useTouchEvents?: boolean;
    accidental?: boolean;
    active?: boolean;
    disabled?: boolean;
    onPlayNoteInput: (midiNumber: number) => void;
    onStopNoteInput: (midiNumber: number) => void;
    accidentalWidthRatio?: number;
    pitchPositions?: {
        [pitch: string]: number;
    };
    noteRange: {
        first: number;
        last: number;
    };
    label?: ReactNode;
    keyColor?: KeyColor;
}
export declare const Key: (props: KeyProps) => import("react/jsx-runtime").JSX.Element;
