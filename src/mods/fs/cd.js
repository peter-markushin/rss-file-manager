import {stat} from "node:fs/promises";
import {resolvePath} from "./helpers.js";

export const cd = async (path) => {
    path = await resolvePath(path);
    const stats = await stat(path);

    if (!stats.isDirectory()) {
        throw new Error('not a directory');
    }

    process.chdir(path);
}
