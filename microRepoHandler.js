/*  repoHandler.js

    DESC: Handles all commands from the Shell file (Sshl.js) that is related to version specifics to repository.

*/

const fs = require('node:fs');



versHandler(cmd) {

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



