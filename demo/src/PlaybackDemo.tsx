import React from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import classNames from 'classnames';

import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';

const PLAY_DURATION = 200;

interface PlaybackDemoProps {
  audioContext: AudioContext;
  soundfontHostname: string;
  song: number[][];
}
class PlaybackDemo extends React.Component<PlaybackDemoProps> {
  playbackIntervalFn: NodeJS.Timeout | null = null;

  state = {
    activeNotesIndex: 0,
    isPlaying: false,
    stopAllNotes: () => console.warn('stopAllNotes not yet loaded'),
  };

  componentDidUpdate(_prevProps: PlaybackDemoProps, prevState: typeof this.state) {
    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        this.playbackIntervalFn = setInterval(() => {
          this.setState((state: typeof this.state, props) => ({
            activeNotesIndex: (state.activeNotesIndex + 1) % props.song.length,
          }));
        }, PLAY_DURATION);
      } else {
        if (this.playbackIntervalFn) {
          clearInterval(this.playbackIntervalFn);
        }
        this.state.stopAllNotes();
        this.setState({
          activeNotesIndex: 0,
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.playbackIntervalFn) {
      clearInterval(this.playbackIntervalFn);
    }
    this.state.stopAllNotes();
  }

  setPlaying = (value: boolean) => {
    this.setState({ isPlaying: value });
  };

  render() {
    const noteRange = {
      first: MidiNumbers.fromNote('c3'),
      last: MidiNumbers.fromNote('f5'),
    };

    return (
      <div>
        <div className="text-center">
          <p>Or try playing it back.</p>
          <div>
            <button
              className={classNames('btn', {
                'btn-outline-info': !this.state.isPlaying,
                'btn-outline-danger': this.state.isPlaying,
              })}
              onClick={() => this.setPlaying(!this.state.isPlaying)}
            >
              {this.state.isPlaying ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <SoundfontProvider
            audioContext={this.props.audioContext}
            instrumentName="ocarina"
            hostname={this.props.soundfontHostname}
            onLoad={({ stopAllNotes }) => this.setState({ stopAllNotes })}
            playDuration={PLAY_DURATION}
            render={({ isLoading, playNote, stopNote }) => (
              <DimensionsProvider>
                {({ containerWidth }) => (
                  <Piano
                    activeNotes={
                      this.state.isPlaying ? this.props.song[this.state.activeNotesIndex] : []
                    }
                    noteRange={noteRange}
                    width={containerWidth}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading || !this.state.isPlaying}
                  />
                )}
              </DimensionsProvider>
            )}
          />
        </div>
      </div>
    );
  }
}

export default PlaybackDemo;
