import {userInfo} from 'node:os';

export const username = async () => {
    console.log(`System user: ${userInfo().username}`);
}
