import {compress} from "./compress.js";
import {decompress} from "./decompress.js";

const COMMANDS = [
    'compress',
    'decompress',
];

export const isSupportedCommand = (command) => {
    return COMMANDS.includes(command);
}

export const executeCommand = async (command, args) => {
    switch (command) {
        case 'compress':
            return compress(args[0], args[1]);
        case 'decompress':
            return decompress(args[0], args[1]);
    }
}
