import { InstrumentName } from "soundfont-player";

type SoundfontName = 'MusyngKite' | 'FluidR3_GM';

export const defaults = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audioContext: new (window.AudioContext || (window as any).webkitAudioContext as AudioContext)(),
  soundfontHostname: 'https://d1pzp51pvbm36p.cloudfront.net',
  soundfont: 'MusyngKite' as SoundfontName,
  instrumentName: 'acoustic_grand_piano' as InstrumentName,
  format: 'mp3',
}
