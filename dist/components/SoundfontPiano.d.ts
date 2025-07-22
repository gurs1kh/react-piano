import { InstrumentName } from 'soundfont-player';
import { NoteRange } from '../hooks/useNoteRange';
import { ControlledPianoProps } from './ControlledPiano';
interface SoundfontPianoProps extends Omit<ControlledPianoProps, 'onPlayNoteInput' | 'onStopNoteInput' | 'playNote' | 'stopNote' | 'noteRange'> {
    width: number;
    audioContext: AudioContext;
    instrumentName?: InstrumentName;
    soundfontHostname?: string;
    onPlayNote?: (midiNumber: number) => void;
    onStopNote?: (midiNumber: number) => void;
    noteRange: NoteRange;
    keyLabels?: Record<number, string>;
    keyboardShortcutInitialOffset?: number;
    enableKeyboardShortcuts?: boolean;
    enableMidiInput?: boolean;
    muted?: boolean;
    audioOnly?: boolean;
}
export interface SoundfontPianoRef {
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    stopAllNotes: () => void;
}
export declare const SoundfontPiano: import('react').ForwardRefExoticComponent<SoundfontPianoProps & import('react').RefAttributes<SoundfontPianoRef>>;
export {};
