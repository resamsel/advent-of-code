export const parse = (input: string): number[] => {
    return input
        .split('\n')
        .filter(x => x.trim() !== '')
        .map(x => parseInt(x, 10))
}

export const diffs = (input: number[]): number[] => {
    return input
        .slice(1)
        .map((value, index, array) => {
            return value - input[index]
        })
        .filter(x => x !== undefined)
        .filter(x => (x as number) > 0)
}

export const solve = (parsed: number[]): number => {
    return diffs(parsed).length
}

export const solveB = (parsed: number[]): number => {
    return diffs(parsed.slice(2).map((value, index, array) => {
        return value + parsed[index] + parsed[index + 1]
    }))
        .filter(x => (x as number) > 0)
        .length
}

export const day1a = (input: string): number => {
    const parsed = parse(input)
    const solved = solve(parsed);
    console.log(`Solution: ${solved}`)
    return solved
}

export const day1b = (input: string): number => {
    const parsed = parse(input)
    const solved = solveB(parsed);
    console.log(`Solution: ${solved}`)
    return solved
}
