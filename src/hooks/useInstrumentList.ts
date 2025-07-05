import { useEffect, useState } from "react";
import { defaults } from '../config/defaults';

export const useInstrumentList = (hostname = defaults.soundfontHostname, soundfont = defaults.soundfont) => {
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
