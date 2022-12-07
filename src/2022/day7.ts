import {nonEmpty, numericAsc, sum} from "../util";

export interface Command {
    name: string;
    args: string[];
}

export interface Execution {
    command: Command;
    output: string[];
}

export interface File {
    name: string;
    size: number;
}

export interface Directory {
    path: string;
    parentDirectory?: Directory;
    contents: Record<string, File | Directory>;
}

const parseExecutions = (executions: Execution[]): Directory => {
    const rootDirectory: Directory = {
        path: '',
        contents: {}
    };
    let currentWorkingDirectory = rootDirectory;

    executions.forEach(exec => {
        switch (exec.command.name) {
            case 'cd': {
                const directoryName = exec.command.args[0];
                switch (directoryName) {
                    case '/':
                        currentWorkingDirectory = rootDirectory
                        break;
                    case '..':
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        currentWorkingDirectory = currentWorkingDirectory.parentDirectory!;
                        break;
                    default:
                        currentWorkingDirectory = currentWorkingDirectory.contents[directoryName] as Directory;
                }
                return;
            }
            case 'ls':
                exec.output.forEach(line => {
                    const [dirOrSize, name] = line.split(' ')
                    if (dirOrSize === 'dir') {
                        currentWorkingDirectory.contents[name] = {
                            path: `${currentWorkingDirectory.path}/${name}`,
                            parentDirectory: currentWorkingDirectory,
                            contents: {},
                            size: 0
                        };
                    } else {
                        const size = parseInt(dirOrSize, 10);
                        currentWorkingDirectory.contents[name] = {name, size};
                    }
                });
                return;
        }
    });

    return rootDirectory;
};

const parseCommand = (c: string): Command => {
    const [name, ...args] = c.split(' ');
    return {name, args};
};

export const parse = (input: string): Directory => {
    return parseExecutions(input.split('\n')
        .filter(nonEmpty)
        .reduce((commands, line) => {
            if (line.startsWith("$ ")) {
                commands.push({
                    command: parseCommand(line.substring(2)),
                    output: []
                });
            } else {
                commands[commands.length - 1].output.push(line);
            }
            return commands;
        }, [] as Execution[]));
};

const isFile = (dirOrFile: File | Directory): dirOrFile is File => 'size' in dirOrFile;

const isDirectory = (dirOrFile: File | Directory): dirOrFile is Directory => 'contents' in dirOrFile;

const contents = (directory: Directory): (File | Directory)[] =>
    Object.values(directory.contents);

const sizeOfDirectory = (directory: Directory): number => {
    return [
        ...contents(directory)
            .filter(isFile)
            .map(file => file.size),
        ...contents(directory)
            .filter(isDirectory)
            .map(sizeOfDirectory)
    ].reduce(sum);
}

const allDirectories = (directory: Directory): Directory[] => {
    return [
        directory,
        ...contents(directory)
            .filter(isDirectory)
            .flatMap(allDirectories)
    ];
}

export const solveA = (parsed: Directory): number => {
    return allDirectories(parsed)
        .map(sizeOfDirectory)
        .filter(s => s <= 100000)
        .reduce(sum);
};

export const solveB = (parsed: Directory): number => {
    const totalSize = 70000000;
    const neededSize = 30000000;
    const totalFree = totalSize - sizeOfDirectory(parsed);
    const toBeFreedSize = neededSize - totalFree;
    return allDirectories(parsed)
        .map(sizeOfDirectory)
        .sort(numericAsc)
        .find(size => size >= toBeFreedSize) || 0;
};
