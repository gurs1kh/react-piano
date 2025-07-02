import React from 'react';

export interface InstrumentListProviderProps {
  hostname: string;
  soundfont?: 'MusyngKite' | 'FluidR3_GM';
  render: (instrumentList: any) => React.ReactNode;
}

export class InstrumentListProvider extends React.Component<InstrumentListProviderProps> {
  static defaultProps = {
    soundfont: 'MusyngKite',
  };

  state  = {
    instrumentList: null,
  };

  componentDidMount() {
    this.loadInstrumentList();
  }

  loadInstrumentList = () => {
    fetch(`${this.props.hostname}/${this.props.soundfont}/names.json`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          instrumentList: data,
        });
      });
  };

  render() {
    return this.props.render(this.state.instrumentList);
  }
}
