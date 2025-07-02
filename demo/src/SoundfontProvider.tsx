// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';

export interface SoundfontProviderProps {
  instrumentName: InstrumentName;
  hostname: string;
  format?: 'mp3' | 'ogg';
  soundfont?: 'MusyngKite' | 'FluidR3_GM';
  audioContext: AudioContext;
  onLoad?: (api: {
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    stopAllNotes: () => void;
  }) => void;
  playDuration?: number;
  render?: (api: {
    isLoading: boolean;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    stopAllNotes: () => void;
  }) => React.ReactNode;
}

interface SoundfontProviderState {
  activeAudioNodes: { [midiNumber: number]: any };
  instrument?: Player;
}

export class SoundfontProvider extends React.Component<SoundfontProviderProps> {
  static defaultProps = {
    format: 'mp3' as const,
    soundfont: 'MusyngKite' as const,
    instrumentName: 'acoustic_grand_piano',
  };

  state: SoundfontProviderState = {
    activeAudioNodes: {},
    instrument: undefined,
  };

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
  }

  componentDidUpdate(prevProps: SoundfontProviderProps, prevState: SoundfontProviderState) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName);
    }

    if (prevState.instrument !== this.state.instrument) {
      if (!this.props.onLoad) {
        return;
      }
      this.props.onLoad({
        playNote: this.playNote,
        stopNote: this.stopNote,
        stopAllNotes: this.stopAllNotes,
      });
    }
  }

  loadInstrument = (instrumentName: InstrumentName) => {
    // Re-trigger loading state
    this.setState({
      instrument: null,
    });
    Soundfont.instrument(this.props.audioContext, instrumentName, {
      format: this.props.format,
      soundfont: this.props.soundfont,
      nameToUrl: (name: string, soundfont: string, format: string) => {
        return `${this.props.hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then((instrument: any) => {
      this.setState({
        instrument,
      });
    });
  };

  playNote = (midiNumber: number) => {
    this.resumeAudio().then(() => {
      const playParams: Parameters<Player["start"]> = !this.props.playDuration
        ? [String(midiNumber)]
        : [String(midiNumber), this.props.audioContext.currentTime, { duration: this.props.playDuration / 1000 }];
        
      const audioNode = this.state.instrument?.play(...playParams);
      this.setState({
        activeAudioNodes: Object.assign({}, this.state.activeAudioNodes, {
          [midiNumber]: audioNode,
        }),
      });
    });
  };

  stopNote = (midiNumber: number) => {
    this.resumeAudio().then(() => {
      if (!this.state.activeAudioNodes[midiNumber]) {
        return;
      }
      const audioNode = this.state.activeAudioNodes[midiNumber];
      if (audioNode) {
        audioNode.stop();
      }
      this.setState({
        activeAudioNodes: Object.assign({}, this.state.activeAudioNodes, { [midiNumber]: null }),
      });
    });
  };

  resumeAudio = () => {
    if (this.props.audioContext.state === 'suspended') {
      return this.props.audioContext.resume();
    } else {
      return Promise.resolve();
    }
  };

  // Clear any residual notes that don't get called with stopNote
  stopAllNotes = () => {
    this.props.audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(this.state.activeAudioNodes);
      activeAudioNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      this.setState({
        activeAudioNodes: {},
      });
    });
  };

  render() {
    return this.props.render
      ? this.props.render({
          isLoading: !this.state.instrument,
          playNote: this.playNote,
          stopNote: this.stopNote,
          stopAllNotes: this.stopAllNotes,
        })
      : null;
  }
}
