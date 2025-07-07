import { useState, useEffect } from 'react';
import { ControlledPiano, ControlledPianoProps } from './ControlledPiano';

export interface PianoProps extends Omit<ControlledPianoProps, 'activeNotes' | 'onPlayNoteInput' | 'onStopNoteInput'> {
  activeNotes?: number[];
  onPlayNoteInput?: (midiNumber: number, options: { prevActiveNotes: number[] }) => void;
  onStopNoteInput?: (midiNumber: number, options: { prevActiveNotes: number[] }) => void;
}

export const Piano = (props: PianoProps) => {
  const [activeNotes, setActiveNotes] = useState<number[]>(props.activeNotes || []);

  // Make activeNotes "controllable" by using internal
  // state by default, but allowing prop overrides.
  useEffect(() => {
    if (
      props.activeNotes !== undefined &&
      props.activeNotes !== activeNotes
    ) {
      setActiveNotes(props.activeNotes);
    }
  }, [activeNotes, props.activeNotes]);

  return (
    <ControlledPiano
      {...props}
      activeNotes={activeNotes}
    />
  );
};
