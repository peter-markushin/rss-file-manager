import {eol} from './eol.js';
import {cpus} from './cpus.js';
import {homedir} from './homedir.js';
import {arch} from './arch.js';
import {username} from './username.js';

const COMMANDS = [
    'os'
];

export const isSupportedCommand = (command) => {
    return COMMANDS.includes(command);
}

export const executeCommand = async (command, args) => {
    switch (args[0]) {
        case '--EOL':
            return eol();
        case '--cpus':
            return cpus();
        case '--homedir':
            return homedir();
        case '--username':
            return username();
        case '--architecture':
            return arch();
    }
}
