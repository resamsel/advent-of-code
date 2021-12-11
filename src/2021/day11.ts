import { Range } from 'immutable';
import { cartesianProduct, nonEmpty, parseNumbers } from '../util';

interface Octopus {
  energy: number;
  flashed: boolean;
}

interface State {
  grid: Octopus[][];
  count: number;
}

export const parse = (input: string): Octopus[][] => {
  return input.split('\n')
    .filter(nonEmpty)
    .map(line => parseNumbers(line, '')
      .map(value => ({energy: value, flashed: false})));
};

/**
 * First, the energy level of each octopus increases by 1.
 *
 * @param grid the given grid will be changed.
 */
const increase = (grid: Octopus[][]): void => {
  grid.forEach((line, row) => {
    line.forEach((o, col) => {
      grid[row][col].energy += 1;
    });
  });
};

/**
 * Increase adjacent octopuses, and returns true, when an octopus flashed during this process.
 *
 * @param grid the given grid will be changed.
 * @param row the index for the first dimension
 * @param col the index for the second dimension
 */
const flashIndividual = (grid: Octopus[][], row: number, col: number): number => {
  grid[row][col].flashed = true;

  cartesianProduct([row - 1, row, row + 1], [col - 1, col, col + 1])
    // skip self
    .filter(([r, c]) => !(r === row && c === col))
    // skip positions outside of grid
    .filter(([r, c]) => r >= 0 && r < grid.length && c >= 0 && c < grid[r].length)
    // increase energy
    .forEach(([r, c]) => grid[r][c].energy += 1);

  return 1;
};

/**
 * Then, any octopus with an energy level greater than 9 flashes. This
 * increases the energy level of all adjacent octopuses by 1, including
 * octopuses that are diagonally adjacent. If this causes an octopus to
 * have an energy level greater than 9, it also flashes. This process
 * continues as long as new octopuses keep having their energy level
 * increased beyond 9. (An octopus can only flash at most once per step.)
 *
 * The process continues outside whenever at least a single octopus has
 * flashed.
 *
 * @param grid the given grid will be changed.
 */
const flash = (grid: Octopus[][]): number => {
  return grid.reduce((count, line, row) =>
    count + line.reduce((c, o, col) => {
      // cannot filter before as the indexes would change
      if (!o.flashed && o.energy > 9) {
        return c + flashIndividual(grid, row, col);
      }
      return c;
    }, 0), 0);
};

/**
 * Finally, any octopus that flashed during this step has its energy
 * level set to 0, as it used all of its energy to flash.
 *
 * @param grid the given grid will be changed.
 */
const reset = (grid: Octopus[][]): number => {
  return grid.reduce((count, line) =>
    count + line.filter(o => o.flashed)
      .reduce((c, o) => {
        // reset octopus
        o.energy = 0;
        o.flashed = false;
        return c + 1;
      }, 0), 0);
};

export const solveA = (parsed: Octopus[][]): number => {
  return Range(0, 100)
    .reduce((state) => {
      increase(state.grid);

      // repeat until no more flashes
      while (flash(state.grid) > 0) {
      }

      const count = reset(state.grid);

      return {
        ...state,
        count: state.count + count,
      };
    }, {grid: parsed, count: 0} as State).count;
};

export const solveB = (parsed: Octopus[][]): number => {
  const countOctopuses = parsed.length * parsed[0].length;
  return Range()
    .findIndex(() => {
      increase(parsed);

      // repeat until no more flashes
      while (flash(parsed) > 0) {
      }

      const count = reset(parsed);

      return count === countOctopuses;
    }) + 1;
};
