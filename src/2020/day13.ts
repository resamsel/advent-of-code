import { promises } from 'fs';

export interface BusDelay {
  id: number;
  delay: number;
}

export interface Day13 {
  now: number;
  buses: BusDelay[];
}

export const parse = (data: string): Day13 => {
  const [nowString, busesString] = data.split('\n', 2);
  return {
    now: parseInt(nowString, 10),
    buses: busesString.split(',')
      .map((x, index) => ({
        id: x !== 'x' ? parseInt(x, 10) : 0,
        delay: index,
      })),
  };
};

const solve = (parsed: Day13): void => {
  console.log(JSON.stringify(parsed));
  const [nextBus, departure] = parsed.buses
    .filter(x => x.id !== 0)
    .map(x => x.id)
    .map(busId => [busId, (Math.floor(parsed.now / busId) + 1) * busId])
    .sort((a, b) => a[1] - b[1])[0];
  console.log(`Next bus ${nextBus} in ${departure - parsed.now} minutes (${nextBus * (departure - parsed.now)})`);
};

export const findProductWithDiff = (a: number, b: number, diff: number): number => {
  // console.log(`Find ${a}, ${b}, ${diff}`)
  let i = 1;
  while (true) {
    const prod = a * i;
    if ((prod + diff) % b === 0) {
      console.log(`Found: (a=${a} * i=${i} + d=${diff}) % b=${b} = ${prod}`);
      console.log(`Found: b=${b} - (a=${a} % b=${b}) = ${b - (a % b)}`);
      return prod;
    }
    i += 1;
  }
};

export const validate = (input: BusDelay[], time: number): boolean => {
  const booleans = input
    .map(bus => (time + bus.delay) % bus.id === 0);
  return booleans.every(x => x);
};

export const calculate = (input: BusDelay[]): number => {
  const filtered = input.filter(x => x.id !== 0);
  const max = filtered.sort((a, b) => b.id - a.id)[0];
  let i = -max.delay;
  while (true) {
    if (validate(filtered, i)) {
      return i;
    }
    i += max.id;
  }
};

export const solve2 = (parsed: Day13): number => {
  const departure = calculate(parsed.buses);
  console.log(`Earliest timestamp: ${departure - parsed.now}`);
  parsed.buses
    .filter(x => x.id !== 0)
    .forEach(busDelay => {
      console.log(`${departure}: bus ${busDelay.id} (${(departure + busDelay.delay) % busDelay.id})`);
    });
  return departure;
};

const sample = `939
17,x,13,19`;

try {
  const parsed = parse(sample);
  solve(parsed);
  // solve2(parsed)
} catch (e) {
}

export const day13a = () =>
  promises.readFile('inputs/2020/day13.txt', 'utf8')
    .then(parse)
    .then(solve);

export const day13b = () =>
  promises.readFile('inputs/2020/day13.txt', 'utf8')
    .then(parse)
    .then(solve2);
