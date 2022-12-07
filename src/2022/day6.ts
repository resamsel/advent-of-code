export const parse = (input: string): string[] => {
    return input.split('');
};

const findMarker = (message: string[], numberOfDistinctCharacters: number): number => {
    return message.findIndex((c, index) => {
        const start = Math.max(index - numberOfDistinctCharacters + 1, 0);
        const end = start + numberOfDistinctCharacters;
        return new Set(message.slice(start, end)).size === numberOfDistinctCharacters;
    }) + 1;
};

export const solveA = (parsed: string[]): number => {
    return findMarker(parsed, 4);
};

export const solveB = (parsed: string[]): number => {
    return findMarker(parsed, 14);
};
