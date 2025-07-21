import { InstrumentName } from "soundfont-player";

type SoundfontName = 'MusyngKite' | 'FluidR3_GM';

export const defaults = {
  soundfontHostname: 'https://d1pzp51pvbm36p.cloudfront.net',
  soundfont: 'MusyngKite' as SoundfontName,
  instrumentName: 'acoustic_grand_piano' as InstrumentName,
  format: 'mp3',
}
