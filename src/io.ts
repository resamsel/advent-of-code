import {promises} from "fs";

export const readFile = (filename: string): Promise<string> =>
    promises.readFile(filename, 'utf8')
