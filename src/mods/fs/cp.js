import {open, stat} from "node:fs/promises";
import {basename, join} from "node:path";
import {resolvePath} from "./helpers.js";

export const cp = async (srcPath, dstName) => {
    srcPath = resolvePath(srcPath);
    dstName = resolvePath(dstName);

    const srcStat = await stat(srcPath);
    const dstPath = join(dstName, basename(srcPath));

    if (!srcStat.isFile()) {
        throw new Error('Source is not a file');
    }

    const srcFd = await open(srcPath);
    const dstFd = await open(dstPath, 'wx');

    const srcStream = srcFd.createReadStream({encoding: 'utf8', autoClose: true});
    const dstStream = dstFd.createWriteStream({encoding: 'utf8', autoClose: true});

    srcStream.pipe(dstStream);
}
