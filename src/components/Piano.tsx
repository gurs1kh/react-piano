import { useState, useEffect, useCallback } from 'react';
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

  const handlePlayNoteInput = useCallback((midiNumber: number) => {
    setActiveNotes((prevActiveNotes) => {
      if (props.onPlayNoteInput) {
        props.onPlayNoteInput(midiNumber, { prevActiveNotes });
      }
      if (prevActiveNotes.includes(midiNumber)) {
        return prevActiveNotes;
      }
      return prevActiveNotes.concat(midiNumber);
    });
  }, [props]);

  const handleStopNoteInput = useCallback((midiNumber: number) => {
    setActiveNotes((prevActiveNotes) => {
      if (props.onStopNoteInput) {
        props.onStopNoteInput(midiNumber, { prevActiveNotes });
      }
      return prevActiveNotes.filter((note) => midiNumber !== note);
    });
  }, [props]);

  return (
    <ControlledPiano
      {...props}
      activeNotes={activeNotes}
      onPlayNoteInput={handlePlayNoteInput}
      onStopNoteInput={handleStopNoteInput}
    />
  );
};
