enum Action {
  Forward = 'forward',
  Down = 'down',
  Up = 'up'
}

interface Instruction {
  action: Action;
  value: number;
}

export const parse = (input: string): Instruction[] => {
  return input
    .split('\n')
    .filter(x => x.trim() !== '')
    .map(x => x.split(' '))
    .map(([action, value]) => ({action: action as Action, value: parseInt(value, 10)}));
};

export const solve = (parsed: Instruction[]): number => {
  const pos = parsed.reduce((agg, curr) => {
    switch (curr.action) {
      case Action.Forward:
        return {...agg, pos: agg.pos + curr.value};
      case Action.Down:
        return {...agg, depth: agg.depth + curr.value};
      case Action.Up:
        return {...agg, depth: agg.depth - curr.value};
    }
  }, {pos: 0, depth: 0});
  return pos.pos * pos.depth;
};

export const solveB = (parsed: Instruction[]): number => {
  const pos = parsed.reduce((agg, curr) => {
    switch (curr.action) {
      case Action.Forward:
        return {...agg, pos: agg.pos + curr.value, depth: agg.depth + agg.aim * curr.value};
      case Action.Down:
        return {...agg, aim: agg.aim + curr.value};
      case Action.Up:
        return {...agg, aim: agg.aim - curr.value};
    }
  }, {pos: 0, depth: 0, aim: 0});
  return pos.pos * pos.depth;
};

export const day2a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day2b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
