import {promises} from 'fs'

interface Group {
    size: number;
    answers: Record<string, number>;
}

const parse = (data: string): Group[] =>
    data.split('\n\n')
        .filter(line => line.trim().length > 0)
        .map(line => [...line.replace(/\n/g, '')].reduce((agg, curr) => ({
            size: line.split('\n').filter(p => p.trim().length > 0).length,
            answers: {...agg.answers, [curr]: (agg.answers[curr] ?? 0) + 1},
        }), {size: 0, answers: {}} as Group))

const count = (group: Group): number => Object.keys(group.answers).length

const count2 = (group: Group): number => Object.entries(group.answers)
    .filter(([key, value]) => value === group.size).length

const sum = (sum: number, curr: number) => sum + curr

const sample = `abc

a
b
c

ab
ac

a
a
a
a

b`

console.log(`Sample: ${JSON.stringify(parse(sample))}`)
console.log(`Sample: ${JSON.stringify(parse(sample).map(count).reduce(sum, 0))}`)
console.log(`Sample: ${JSON.stringify(parse(sample).map(count2).reduce(sum, 0))}`)

export const day6 = () =>
    promises.readFile('inputs/2020/day6.txt', 'utf8')
        .then(parse)
        .then(input => {
            console.log(`Count #1: ${input.map(count).reduce(sum, 0)}`)
            // console.log(`${input.map(j => JSON.stringify(j) + ': ' + count2(j)).join('\n')}`)
            console.log(`Count #2: ${input.map(count2).reduce(sum, 0)}`)
        })
