import 'react-piano/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { InteractiveDemo } from './demos/InteractiveDemo';
import { PlaybackDemo } from './demos/PlaybackDemo';
import './App.scss';

export const App = () => (
  <div>
    <header style={{ background: '#333' }}>
      <div className="container">
        <div className="text-sm-center text-white py-5">
          <h1>react-piano</h1>
          <p>
            An interactive piano keyboard for React. Supports custom sounds,
            <br className="d-none d-sm-block" /> touch/click/keyboard events, and fully configurable
            styling.
          </p>
          <div className="mt-4">
            <a
              className="btn btn-outline-light btn-lg"
              href="https://github.com/kevinsqi/react-piano"
            >
              View docs on Github
            </a>
          </div>
        </div>
      </div>
    </header>
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <InteractiveDemo />
        </div>
      </div>
      <hr className="mt-5" />
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <PlaybackDemo />
        </div>
      </div>
      <hr className="mt-5" />
      <div className="row mt-5">
        <div className="col">
          <div className="text-center">
            <h2>Installation</h2>
            <p className="mt-4">Install with yarn or npm:</p>
            <p className="mt-3">
              <code className="p-2 text-dark bg-yellow">yarn add react-piano</code>
            </p>
            <div className="mt-5">
              <a className="btn btn-info btn-lg" href="https://github.com/kevinsqi/react-piano">
                View docs on Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="bg-yellow mt-5 py-5">
      <div className="container">
        <div className="text-center text-secondary">
          Made with{' '}
          <span role="img" aria-label="keyboard emoji">
            🎵
          </span>
          by{' '}
          <a className="text-secondary" href="https://www.kevinqi.com/">
            <strong>@kevinsqi</strong>
          </a>
        </div>
      </div>
    </footer>
  </div>
);

