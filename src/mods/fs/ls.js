import {readdir} from "node:fs/promises";
import {resolvePath} from "./helpers.js";

export const ls = async (path) => {
    path = resolvePath(path);

    const dirEntries = await readdir(path, {withFileTypes: true});
    const sortedFileList = dirEntries
        .sort(compareDirEntries)
        .map((entry) => {
            return {
                'Name': entry.name,
                'Type': entry.isDirectory() ? 'directory' : 'file'
            }
        });

    console.table(sortedFileList);
}

const compareDirEntries = (a, b) => {
    if (a.isDirectory() && !b.isDirectory()) {
        return -1;
    }

    if (b.isDirectory() && !a.isDirectory()) {
        return 1;
    }

    return a.name > b.name ? 1 : -1;
}
