declare module "simple-midi-input" {
  export default class SimpleMidiInput {
    constructor();
    getInputs(): MIDIInput[];
    attach(
      type: MIDIAccess,
    ): void;
    detach(): void;
    on(
      type: string,
      listener: (data: { event: string; key: number; velocity: number; }) => void
    ): void;
    off(
      type: string,
      listener: (data: { event: string; key: number; velocity: number; }) => void
    ): void;
  }
}