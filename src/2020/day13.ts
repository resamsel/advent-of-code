import {promises} from 'fs'

export interface BusDelay {
    id: number;
    delay: number;
}

export interface Day13 {
    now: number;
    buses: BusDelay[];
}

const parse = (data: string): Day13 => {
    const [nowString, busesString] = data.split('\n', 2)
    return {
        now: parseInt(nowString, 10),
        buses: busesString.split(',')
            .map((x, index) => ({
                id: x !== 'x' ? parseInt(x, 10) : 0,
                delay: index,
            })),
    }
}

const solve = (parsed: Day13): void => {
    console.log(JSON.stringify(parsed))
    const [nextBus, departure] = parsed.buses
        .filter(x => x.id !== 0)
        .map(x => x.id)
        .map(busId => [busId, (Math.floor(parsed.now / busId) + 1) * busId])
        .sort((a, b) => a[1] - b[1])[0]
    console.log(`Next bus ${nextBus} in ${departure - parsed.now} minutes (${nextBus * (departure - parsed.now)})`)
}

export const findProductWithDiff = (a: number, b: number, diff: number): number => {
    console.log(`Find ${a}, ${b}, ${diff}`)
    let i = 1
    while (true) {
        const prod = a * i
        if ((prod + diff) % b === 0) {
            console.log(`Found: ${a} * ${i} + ${diff} = ${b} * ${prod / b} = ${prod}`)
            return prod
        }
        i += 1
    }
}

export const solve2 = (parsed: Day13): number => {
    const departure = parsed.buses
        .filter(x => x.id !== 0)
        .reduce((agg, curr) => {
            if (curr.delay === 0) {
                return curr.id
            }
            return findProductWithDiff(agg, curr.id, curr.delay)
        }, 0)
    console.log(`Earliest timestamp: ${departure - parsed.now}`)
    parsed.buses
        .filter(x => x.id !== 0)
        .forEach(busDelay => {
            console.log(`${departure}: bus ${busDelay.id} (${(departure + busDelay.delay) % busDelay.id})`)
        })
    return departure
}

const sample = `939
17,x,13,19`

try {
    const parsed = parse(sample)
    solve(parsed)
    // solve2(parsed)
} catch (e) {
}

export const day13a = () =>
    promises.readFile('inputs/2020/day13.txt', 'utf8')
        .then(parse)
        .then(solve)

export const day13b = () =>
    promises.readFile('inputs/2020/day13.txt', 'utf8')
        .then(parse)
        .then(solve2)
