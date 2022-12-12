import {rename, stat} from "node:fs/promises";
import {dirname, join} from "node:path";
import {pathExists, resolvePath} from "./helpers.js";

export const rn = async (srcPath, dstName) => {
    srcPath = resolvePath(srcPath);

    const srcStat = await stat(srcPath);
    const dstPath = join(dirname(srcPath), dstName);
    const destinationExists = await pathExists(dstPath);

    if (!srcStat.isFile()) {
        throw new Error('Source is not a file');
    }

    if (destinationExists) {
        throw new Error('Destination file exists');
    }

    return rename(srcPath, dstPath);
}
