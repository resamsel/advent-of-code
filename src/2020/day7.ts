import {promises} from 'fs'

interface BagRule {
    bag: string;
    children: BagCount[];
}

interface BagCount {
    bag: string;
    count: number;
}

const parseBag = (bagString: string): BagCount => {
    const match = bagString.match(/^(\d+) (.*) bags?$/)
    if (!match) {
        return {bag: '', count: 0}
    }

    const count = parseInt(match[1], 10)

    return {bag: match[2], count}
}

const parseIndividual = (item: string): BagRule => {
    const match = item.match(/^(.*) bags contain (.*).$/)
    if (!match) {
        return {bag: '', children: []}
    }

    if (match[2] === 'no other bags') {
        return {bag: match[1], children: []}
    }

    const children = match[2].split(', ')
        .map(parseBag)

    return {bag: match[1], children}
}

const parse = (data: string): Record<string, BagRule> =>
    data.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => parseIndividual(line))
        .reduce((agg, curr) => ({...agg, [curr.bag]: curr}), {})

const outerShell = (rules: BagRule[], bag: string): string[] => {
    return rules
        .filter(rule => rule.children.find(child => child.bag === bag))
        .map(rule => [rule.bag, ...outerShell(rules, rule.bag)])
        .reduce((agg, curr) => ([...agg, ...curr]), [])
        .filter((value, index, self) => self.indexOf(value) === index)
}

const contentCount = (rules: BagRule[], bag: string): number => {
    return rules.find(rule => rule.bag === bag)!
        .children
        .map(child => child.count + child.count * contentCount(rules, child.bag))
        .reduce((agg, curr) => agg + curr, 0)
}

const sample = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

console.log(`Sample: ${JSON.stringify(outerShell(Object.values(parse(sample)), 'shiny gold'))}`)
console.log(`Shiny gold #1: ${JSON.stringify(contentCount(Object.values(parse(sample)), 'shiny gold'))}`)
console.log(`Dark olive #1: ${JSON.stringify(contentCount(Object.values(parse(sample)), 'dark olive'))}`)
console.log(`Faded blue #1: ${JSON.stringify(contentCount(Object.values(parse(sample)), 'faded blue'))}`)

export const day7 = () =>
    promises.readFile('inputs/2020/day7.txt', 'utf8')
        .then(parse)
        .then(input => {
            console.log(`Result #1: ${outerShell(Object.values(input), 'shiny gold').length}`)
            console.log(`Result #2: ${contentCount(Object.values(input), 'shiny gold')}`)
        })
