import {writeFile} from "node:fs/promises";
import {resolvePath} from "./helpers.js";

export const add = async (path) => {
    path = resolvePath(path);

    return writeFile(path, '', {flag: 'wx'});
}
