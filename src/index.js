import {homedir} from 'node:os';
import {createInterface} from 'node:readline/promises';

import * as fs from './mods/fs/index.js';
import * as os from './mods/os/index.js';
import * as hash from './mods/hash/index.js';
import * as zip from './mods/zip/index.js';

import * as messages from './messages.js';
import {executeModuleCommand, getUserNameFromArgs} from './helpers.js'

const KNOWN_MODULES = [
    fs,
    hash,
    os,
    zip,
];

const cliInterface = await createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
    tabSize: 4
});

const main = async (args) => {
    const userName = await getUserNameFromArgs(args);

    cliInterface
        .on('SIGINT', () => cliInterface.close())
        .on('close', () => messages.exit(userName))
        .on('line', async (commandString) => {
            commandString = commandString.toString().trim();

            try {
                await executeModuleCommand(KNOWN_MODULES, commandString);
            } catch {
                messages.operationFailed();
            }

            messages.cwd();
        });

    process
        .on('exit', () => cliInterface.close())
        .on('uncaughtException', () => messages.operationFailed())
        .on('unhandledRejection', () => messages.operationFailed());

    process.chdir(homedir());

    messages.welcome(userName);
    messages.cwd();
}

await main(process.argv.slice(2));
