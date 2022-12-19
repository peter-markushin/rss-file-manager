import {pipeline} from 'node:stream/promises';
import {createBrotliCompress} from 'node:zlib';
import {open} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {resolvePath} from '../fs/helpers.js';

export const compress = async (srcPath, dstPath) => {
    srcPath = resolvePath(srcPath);
    dstPath = resolvePath(dstPath);
    const dstName = `${basename(srcPath)}.br`;
    dstPath = join(dstPath, dstName);

    const srcFd = await open(srcPath);
    const dstFd = await open(dstPath, 'wx');

    return pipeline(
        srcFd.createReadStream({encoding: 'utf8', autoClose: true}),
        createBrotliCompress(),
        dstFd.createWriteStream({autoClose: true})
    )
}
