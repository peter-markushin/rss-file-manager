export const welcome = (userName) => {
    const msg = 'Welcome to the File Manager'.concat(
        userName ? `, ${userName}!` : '!'
    );

    console.log(msg);
}

export const operationFailed = () => {
    console.error('Operation failed.');
}

export const cwd = () => {
    console.log(`You are currently in ${process.cwd()}`);
}

export const exit = (userName) => {
    const msg = 'Thank you for using File Manager,'.concat(
        userName ? ` ${userName},` : '',
        ' goodbye!'
    );

    console.log(msg)
}
