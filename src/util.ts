export const transpose = <T>(m: T[][]) => m[0].map((x, i) => m.map(x => x[i]));

export const parseNumbers = (input: string, separator: string | RegExp = ','): number[] =>
  input.split(separator)
    .filter(x => x.trim() !== '')
    .map(x => parseInt(x, 10));
