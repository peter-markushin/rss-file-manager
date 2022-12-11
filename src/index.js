import process from 'node:process';

function getUserNameFromArgs(args) {
    const usernameArg = args.find((arg) => arg.startsWith('--username='));

    if (typeof usernameArg === 'string') {
        return usernameArg.substring(11);
    }
}

function execCmd(command) {
    const commandString = command.toString().trim();

    if (commandString === '.exit') {
        process.exit(0);
    }
}

const main = async (args) => {
    const userName = getUserNameFromArgs(args);

    console.log(`Welcome to the File Manager${userName ? ', ' + userName : ''}!`)

    process.stdin.on('data', execCmd);

    process.on('SIGINT', () => {
        process.exit();
    });

    process.on('exit', () => {
        console.log(`\nThank you for using File Manager${userName ? ', ' + userName : ''}, goodbye!`);
    });
}

 await main(process.argv.slice(2));