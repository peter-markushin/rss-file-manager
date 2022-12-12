import {cpus as c} from 'node:os';

export const cpus = async () => {
    const cpuData = c().map((cpuInfo) => {
        const cpuSpeed = Math.round(cpuInfo.speed / 1024);
        return {
            model: cpuInfo.model,
            speed: `${cpuSpeed} GHz`
        };
    });
    console.log(`Total CPUs: ${c().length}`);
    console.table(cpuData)
}
