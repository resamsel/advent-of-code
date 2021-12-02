import {readFile} from "../io";

interface Policy {
    min: number;
    max: number;
    char: string;
}

interface Password {
    password: string;
    policy: Policy;
}

const parse = (input: string): Password => {
    const [policyString, password] = input.split(': ')
    const [minMaxString, char] = policyString.split(' ')
    const [min, max] = minMaxString.split('-')
        .map(s => parseInt(s, 10))
    return {
        password,
        policy: {
            min, max, char,
        },
    }
}

const validate = (password: Password): boolean => {
    const count = password.password.split(password.policy.char).length - 1
    return password.policy.min <= count && count <= password.policy.max
}

const validate2 = (password: Password): boolean => {
    const first = password.password.charAt(password.policy.min - 1) === password.policy.char ? 1 : 0
    const second = password.password.charAt(password.policy.max - 1) === password.policy.char ? 1 : 0
    return (first + second) === 1
}

export const day2 = () =>
    readFile('inputs/2020/day2.txt')
        .then(data => data.split('\n')
            .filter(line => line.trim().length > 8)
            .map(line => parse(line)))
        .catch(error => {
            console.error('error while parsing', error)
            return []
        })
        .then(passwords => {
            console.log(`1-3 a: abcde -> ${validate2(parse('1-3 a: abcde'))}`)
            console.log(`1-3 b: cdefg -> ${validate2(parse('1-3 b: cdefg'))}`)
            console.log(`2-9 c: ccccccccc -> ${validate2(parse('2-9 c: ccccccccc'))}`)

            const validPasswords = passwords.filter(validate).length
            console.log(`Valid passwords #1: ${validPasswords}`)
            const validPasswords2 = passwords.filter(validate2).length
            console.log(`Valid passwords #2: ${validPasswords2}`)
        })
