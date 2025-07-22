import { InstrumentName } from 'soundfont-player';
export { InstrumentName } from 'soundfont-player';
interface UseSoundfontOptions {
    audioContext: AudioContext;
    instrumentName?: InstrumentName;
    hostname?: string;
    format?: 'mp3' | 'ogg';
    soundfont?: 'MusyngKite' | 'FluidR3_GM';
}
export declare function useSoundfont(props: UseSoundfontOptions): {
    isLoading: boolean;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    stopAllNotes: () => void;
};
