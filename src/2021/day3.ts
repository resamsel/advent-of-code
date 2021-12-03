const transpose = (m: number[][]) => m[0].map((x, i) => m.map(x => x[i]))

export const parse = (input: string): number[][] => {
    return input
        .split('\n')
        .filter(x => x.trim() !== '')
        .map(x => [...x].map(x => parseInt(x, 10)))
}

export const count = (input: number[], v: number): number => input.filter(x => x === v).length

export const solve = (parsed: number[][]): number => {
    const gamma = parseInt(transpose(parsed).map(x => count(x, 0) > count(x, 1) ? 0 : 1).join(''), 2)
    const epsilon = parseInt(transpose(parsed).map(x => count(x, 0) > count(x, 1) ? 1 : 0).join(''), 2)
    console.log(`Gamma: ${gamma}, Epsilon: ${epsilon}`)
    return gamma * epsilon
}

const oxygenGeneratorRating = (input: number[][]): number => {
    let filter = []
    let filtered = input
    for (let i = 0; i < input.length; i++) {
        if (filtered.length === 1) {
            return parseInt(filtered[0].join(''), 2)
        }
        const bits = transpose(filtered)[i]
        const newFilter = count(bits, 0) > count(bits, 1) ? 0 : 1
        filtered = filtered.filter(x => x[i] === newFilter)
        filter.push(newFilter)
    }

    return 0
}

const co2ScrubberRating = (input: number[][]): number => {
    let filter = []
    let filtered = input
    for (let i = 0; i < input.length; i++) {
        if (filtered.length === 1) {
            return parseInt(filtered[0].join(''), 2)
        }
        const bits = transpose(filtered)[i]
        const newFilter = count(bits, 0) > count(bits, 1) ? 1 : 0
        filtered = filtered.filter(x => x[i] === newFilter)
        filter.push(newFilter)
    }

    return 0
}

export const solveB = (parsed: number[][]): number => {
    const ogr = oxygenGeneratorRating(parsed)
    const csr = co2ScrubberRating(parsed)

    console.log(`OGR: ${ogr}, CSR: ${csr}`)

    return ogr * csr
}

export const day3a = (input: string): number => {
    const parsed = parse(input)
    const solved = solve(parsed);
    console.log(`Solution: ${solved}`)
    return solved
}

export const day3b = (input: string): number => {
    const parsed = parse(input)
    const solved = solveB(parsed);
    console.log(`Solution: ${solved}`)
    return solved
}
