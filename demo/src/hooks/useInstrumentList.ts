import { useEffect, useState } from "react";

type SoundfontName = 'MusyngKite' | 'FluidR3_GM';

export const useInstrumentList = (hostname: string, soundfont: SoundfontName = 'MusyngKite') => {
  const [instrumentList, setInstrumentList] = useState([]);
  
  useEffect(() => {
    fetch(`${hostname}/${soundfont}/names.json`)
      .then((response) => response.json())
      .then((data) => {
        setInstrumentList(data);
      });
  }, [hostname, soundfont]);

  return { instrumentList };
}
