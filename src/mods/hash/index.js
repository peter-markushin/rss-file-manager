import {hash} from "./hash.js";

const COMMANDS = [
    'hash'
];

export const isSupportedCommand = (command) => {
    return COMMANDS.includes(command);
}

export const executeCommand = async (command, args) => {
    switch (command) {
        case 'hash':
            return hash(args[0]);
    }
}
