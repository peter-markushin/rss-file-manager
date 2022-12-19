import {resolvePath} from '../fs/helpers.js';
import {createHash} from 'node:crypto';
import {open} from "node:fs/promises";


export const hash = async (path) => {
    path = resolvePath(path);

    const hashFunction = createHash('sha256');
    const fd = await open(path);

    const fileStream = fd.createReadStream({
        encoding: 'utf8',
        autoClose: true
    });

    fileStream
        .pipe(hashFunction)
        .setEncoding('hex')
        .on('data', (data) => {
            console.log(`SHA256: ${data.toString()}`);
        });
}
