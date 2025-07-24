/*  repoHandler.js

    DESC: Handles all commands from the Shell file (Sshl.js) that is related to version specifics to repository.

*/

const fs = require('node:fs');
const readline = require('node:readline/promises');
const { getRepo } = require('./macroRepoHandler.js');

mainRepo = undefined;

function versHandler (cmd, repo) {

    mainRepo = repo;

    if (mainRepo === undefined) {

        console.log(console.log('   \x1b[31mERROR!! microHandler.JS called repository is undefined\u001b[0m');)
        return undefined;

    }

    switch (cmd) {

        case 'commit':
            break;
        case 'changelog':
            break;
        case 'recall':
            break;
        case 'list':
            break;
        default:
            console.log(console.log('   \x1b[31mERROR!! cmd: \"' + cmd + '\" DOES NOT EXIT\u001b[0m');)
            break;
    }
}

function commit() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    commitName = await rl.question('What would you like commit version name to be?');

    rl.close();

    try {

        fs.accessSync()

    }
    




}
