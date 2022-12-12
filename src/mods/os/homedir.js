import {homedir as hd} from 'node:os';

export const homedir = async () => {
    console.log(`Home directory: ${hd()}`);
}
