interface CreateKeyboardShortcutsProps {
    firstNote: number;
    lastNote: number;
    keyboardConfig: Array<{
        natural: string;
        flat: string;
        sharp: string;
    }>;
}
declare function createKeyboardShortcuts({ firstNote, lastNote, keyboardConfig }: CreateKeyboardShortcutsProps): Record<number, string>;
export declare const KeyboardShortcuts: {
    create: typeof createKeyboardShortcuts;
    BOTTOM_ROW: {
        natural: string;
        flat: string;
        sharp: string;
    }[];
    HOME_ROW: {
        natural: string;
        flat: string;
        sharp: string;
    }[];
    QWERTY_ROW: {
        natural: string;
        flat: string;
        sharp: string;
    }[];
};
export {};
