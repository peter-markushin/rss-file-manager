import {isAbsolute, resolve} from 'node:path';
import {access} from "node:fs/promises";

export const resolvePath = (path) => {
    if (!path) {
        return process.cwd();
    }

    if (isAbsolute(path)) {
        return path;
    }

    return resolve(process.cwd(), path);
}

export const pathExists = async (checkPath) => {
    try {
        await access(checkPath);

        return true;
    } catch {
        return false;
    }
}
