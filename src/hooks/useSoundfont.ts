import { useEffect, useRef, useState, useCallback } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';
import { defaults } from '../config/defaults';

interface UseSoundfontOptions {
  instrumentName: InstrumentName;
  hostname?: string;
  format?: 'mp3' | 'ogg';
  soundfont?: 'MusyngKite' | 'FluidR3_GM';
  audioContext?: AudioContext;
  playDuration?: number;
}

export function useSoundfont(props: UseSoundfontOptions) {
  const {
    instrumentName = defaults.instrumentName,
    hostname = defaults.soundfontHostname,
    format = defaults.format,
    soundfont = defaults.soundfont,
    audioContext = defaults.audioContext,
    playDuration,
  } = props;
  
  const [instrument, setInstrument] = useState<Player | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [_activeAudioNodes, setActiveAudioNodes] = useState<{ [midiNumber: number]: any }>({});
  const instrumentRef = useRef<Player | undefined>(undefined);
  instrumentRef.current = instrument;

  // Load instrument on mount or when instrumentName changes
  useEffect(() => {
    setIsLoading(true);
    setInstrument(undefined);
    Soundfont.instrument(audioContext, instrumentName, {
      format,
      soundfont,
      nameToUrl: (name: string, sf: string, fmt: string) =>
        `${hostname}/${sf}/${name}-${fmt}.js`,
    }).then((inst: Player) => {
      setInstrument(inst);
      setIsLoading(false);
    });
  }, [instrumentName, hostname, format, soundfont, audioContext]);

  const resumeAudio = useCallback(() => {
    if (audioContext.state === 'suspended') {
      return audioContext.resume();
    }
    return Promise.resolve();
  }, [audioContext]);

  const playNote = useCallback(
    (midiNumber: number) => {
      resumeAudio().then(() => {
        if (!instrumentRef.current) return;
        const playParams: Parameters<Player['start']> = !playDuration
          ? [String(midiNumber)]
          : [String(midiNumber), audioContext.currentTime, { duration: playDuration / 1000 }];
        const audioNode = instrumentRef.current.play(...playParams);
        setActiveAudioNodes((prev) => ({
          ...prev,
          [midiNumber]: audioNode,
        }));
      });
    },
    [audioContext, playDuration, resumeAudio]
  );

  const stopNote = useCallback(
    (midiNumber: number) => {
      resumeAudio().then(() => {
        setActiveAudioNodes((prev) => {
          const audioNode = prev[midiNumber];
          if (audioNode) {
            audioNode.stop();
          }
          return { ...prev, [midiNumber]: null };
        });
      });
    },
    [resumeAudio]
  );

  const stopAllNotes = useCallback(() => {
    resumeAudio().then(() => {
      setActiveAudioNodes((prev) => {
        Object.values(prev).forEach((node) => {
          if (node) node.stop();
        });
        return {};
      });
    });
  }, [resumeAudio]);

  return {
    isLoading,
    playNote,
    stopNote,
    stopAllNotes,
  };
}
