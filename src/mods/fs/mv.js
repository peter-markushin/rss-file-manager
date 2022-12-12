import {resolvePath} from "./helpers.js";
import {cp} from "./cp.js";
import {rm} from "./rm.js";

export const mv = async (srcPath, dstDir) => {
    srcPath = resolvePath(srcPath);
    dstDir = resolvePath(dstDir);

    await cp(srcPath, dstDir);
    await rm(srcPath);
}
