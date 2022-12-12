import {open} from "node:fs/promises";
import {stdout} from "node:process";
import {resolvePath} from "./helpers.js";
import {operationFailed} from "../../messages.js";

export const cat = async (path) => {
    path = resolvePath(path);

    const fd = await open(path);
    const stream = fd.createReadStream({encoding: 'utf8'});

    stream.on('error', () => {
        operationFailed();
    });

    stream.pipe(stdout);
}
