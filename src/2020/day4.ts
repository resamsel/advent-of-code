import {readFile} from "../io";

interface Passport {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

interface Limits {
    min: number;
    max: number;
}

interface HeightLimits {
    cm: Limits;
    in: Limits;
}

const heightLimits: HeightLimits = {
    cm: {min: 150, max: 193},
    in: {min: 59, max: 76},
}

const parsePassport = (line: string): Passport => line.split(' ')
    .map(keyValue => {
        const [key, value] = keyValue.split(':')
        return {[key]: value}
    })
    .reduce((passport, keyValue) => ({...passport, ...keyValue}), {} as Passport)

const parse = (data: string): Passport[] =>
    data.split('\n\n')
        .map(entries => entries.replace(/\n/g, ' '))
        .filter(line => line.trim().length > 0)
        .map(parsePassport)

const validate = (passport: Passport): boolean =>
    ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((key) => key in passport)

const validateYear = (yearString: string, min: number, max: number): boolean => {
    const year = parseInt(yearString, 10)
    return min <= year && year <= max
}

const validateHeight = (dimensionString: string): boolean => {
    const match = dimensionString.match(/^(\d+)(cm|in)$/)
    if (!match || match.length !== 3) {
        // console.log(`Groups: ${match}, input: ${dimensionString}`)
        return false
    }

    const unit = match[2] as keyof HeightLimits
    if (!(unit in heightLimits)) {
        // console.log(`Invalid unit: ${unit}`)
        return false
    }
    const dimension = parseInt(match[1], 10)
    return heightLimits[unit].min <= dimension && dimension <= heightLimits[unit].max
}

const validateColor = (colorString: string): boolean => {
    const match = colorString.match(/^#[0-9a-f]{6}$/)
    return match !== null
}

const validatePid = (pidString: string): boolean => {
    const match = pidString.match(/^\d{9}$/)
    return match !== null
}

const validate2 = (passport: Passport): boolean => {
    if (!validate(passport)) {
        return false
    }

    if (!validateYear(passport.byr, 1920, 2002)) {
        // console.log(`Invalid byr: ${passport.byr}`)
        return false
    }

    if (!validateYear(passport.iyr, 2010, 2020)) {
        // console.log(`Invalid iyr: ${passport.iyr}`)
        return false
    }

    if (!validateYear(passport.eyr, 2020, 2030)) {
        // console.log(`Invalid eyr: ${passport.eyr}`)
        return false
    }

    if (!validateHeight(passport.hgt)) {
        // console.log(`Invalid hgt: ${passport.hgt}`)
        return false
    }

    if (!validateColor(passport.hcl)) {
        // console.log(`Invalid hcl: ${passport.hcl}`)
        return false
    }

    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) {
        // console.log(`Invalid ecl: ${passport.ecl}`)
        return false
    }

    if (!validatePid(passport.pid)) {
        // console.log(`Invalid pid: ${passport.pid}`)
        return false
    }

    return true
}

const sample = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

console.log(parse(sample)
    .filter(validate).length)

export const day4 = () =>
    readFile('inputs/2020/day4.txt')
        .then(parse)
        .then(input => {
            console.log(`Valid passports: ${input.filter(validate2).length}`)
        })
