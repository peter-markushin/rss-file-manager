import {unlink} from 'node:fs/promises';
import {resolvePath} from "./helpers.js";

export const rm = async (path) => {
    path = resolvePath(path);

    return unlink(path);
}
