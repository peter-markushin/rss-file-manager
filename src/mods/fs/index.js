import {cd} from './cd.js';
import {ls} from './ls.js';
import {cat} from './cat.js';
import {add} from './add.js';
import {cp} from './cp.js';
import {rn} from './rn.js';
import {mv} from './mv.js';
import {rm} from './rm.js';

const COMMANDS = [
    'up',
    'cd',
    'ls',
    'cat',
    'add',
    'rn',
    'cp',
    'mv',
    'rm',
];

export const isSupportedCommand = (command) => {
    return COMMANDS.includes(command);
}

export const executeCommand = async (command, args) => {
    switch (command) {
        case 'up':
            return cd('..');
        case 'cd':
            return cd(args[0]);
        case 'ls':
            return ls(args[0]);
        case 'cat':
            return cat(args[0]);
        case 'add':
            return add(args[0]);
        case 'rn':
            return rn(args[0], args[1]);
        case 'cp':
            return cp(args[0], args[1]);
        case 'mv':
            return mv(args[0], args[1]);
        case 'rm':
            return rm(args[0]);
    }
}
