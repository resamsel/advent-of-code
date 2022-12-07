export interface Elf {
    foods: number[];
}

export const parse = (input: string): Elf[] => {
  return input.split('\n')
      .reduce((elves, line) => {
          if (line.length === 0) {
              return [...elves, {foods:[]}];
          }

          elves[elves.length - 1].foods.push(parseInt(line, 10));

          return elves;
      }, [{foods:[]}] as Elf[]);
};

export const solveA = (parsed: Elf[]): number => {
    const elvesSorted = parsed
        .map(elf => elf.foods.reduce((sum, next) => sum + next, 0))
        .sort((a, b) => a - b);
    return elvesSorted[elvesSorted.length - 1];
};

export const solveB = (parsed: Elf[]): number => {
    const elvesSorted = parsed
        .map(elf => elf.foods.reduce((sum, next) => sum + next, 0))
        .sort((a, b) => a - b);
    return elvesSorted.slice(elvesSorted.length - 3).reduce((sum, next) => sum + next, 0);
};
