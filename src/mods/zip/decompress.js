import {pipeline} from 'node:stream/promises';
import {createBrotliDecompress} from 'node:zlib';
import {open} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {resolvePath} from '../fs/helpers.js';

const ARCHIVE_EXTENSION = '.br';

export const decompress = async (srcPath, dstPath) => {
    srcPath = resolvePath(srcPath);
    dstPath = resolvePath(dstPath);
    let dstName = basename(srcPath);

    if (dstName.endsWith(ARCHIVE_EXTENSION)) {
        dstName = dstName.substring(0, dstName.length - ARCHIVE_EXTENSION.length);
    }

    dstPath = join(dstPath, dstName);

    const srcFd = await open(srcPath);
    const dstFd = await open(dstPath, 'wx');

    return pipeline(
        srcFd.createReadStream(),
        createBrotliDecompress(),
        dstFd.createWriteStream({encoding: 'utf8'})
    )
}
