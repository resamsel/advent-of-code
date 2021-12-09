export const transpose = <T>(m: T[][]) => m[0].map((x, i) => m.map(x => x[i]));

export const parseNumbers = (input: string, separator: string | RegExp = ','): number[] =>
  input.split(separator)
    .filter(x => x.trim() !== '')
    .map(x => parseInt(x, 10));

export const sum = (a: number, b: number) => a + b;

export const product = (a: number, b: number) => a * b;

export const numericAsc = (a: number, b: number): number => a - b;

export const numericDesc = (a: number, b: number): number => b - a;

export const arrayEquals = <T>(a: T[], b: T[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

export const cartesianProduct = <T>(...allEntries: T[][]): T[][] => {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map(result => entries.map(entry => result.concat([entry])))
        .reduce((subResults, result) => subResults.concat(result), []),
    [[]],
  );
};

export const countOccurrences = <T>(input: T[], v: T): number =>
  input.filter(x => x === v).length;
