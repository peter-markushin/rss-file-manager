import process from "node:process";

export const executeModuleCommand = async (knownModules, commandString) => {
    if (commandString === '') {
        return;
    }

    if (commandString === '.exit') {
        process.exit(0);
    }

    const [command, commandArguments] = parseCommandArguments(commandString);

    for (const module of knownModules) {
        if (!module.isSupportedCommand(command)) {
            continue;
        }

        return await module.executeCommand(command, commandArguments);
    }

    throw new Error('Operation failed.');
}

export const getUserNameFromArgs = async (args) => {
    const usernameArg = args.find((arg) => arg.startsWith('--username='));

    if (usernameArg) {
        return usernameArg.substring('--username='.length);
    }
}

const parseCommandArguments = (commandString) => {
    if (!commandString.includes(' ')) {
        return [commandString, []];
    }

    const cmd = commandString.substring(0, commandString.indexOf(' '));
    const argsString = commandString.substring(commandString.indexOf(' ') + 1);
    const args = argsString
        .match(/('[^']+'|"[^"]+"|[^\s]+)(\s+|$)/g)
        .map((arg) => {
            arg = arg.trim();

            if (arg.startsWith('\'') || arg.startsWith('"')) {
                arg = arg.substring(1, arg.length - 1)
            }

            return arg;
        });

    return [cmd, args];
}
