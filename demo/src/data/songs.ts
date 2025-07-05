import { InstrumentName } from "soundfont-player";

export interface Song {
  playDuration: number;
  instrumentName: InstrumentName;
  notes: number[][];
}

export const lostWoods: Song = {
  playDuration: 200,
  instrumentName: 'ocarina',
  notes: [
    [65],
    [69],
    [71],
    [],
    [65],
    [69],
    [71],
    [],
    [65],
    [69],
    [71],
    [76],
    [74],
    [],
    [71],
    [72],
    [71],
    [67],
    [64],
    [],
    [],
    [],
    [],
    [62],
    [64],
    [67],
    [64],
    [],
    [],
    [],
    [],
    [],
  ],
};
