/*  repoHandler.js

    DESC: Handles all commands from the Shell file (Sshl.js) that is related to version specifics to repository.

*/

const fs = require('node:fs');
const readline = require('node:readline/promises');
const pth = require('node:path');
const { getRepo, saveRepoJson, allRepos } = require('./macroRepoHandler.js');
const { listenerCount } = require('node:process');

async function versHandler (cmd, repo) {

    mainRepo = repo;

    if (mainRepo === undefined) {

        console.log(console.log('   \x1b[31mERROR!! microHandler.JS called repository is undefined\u001b[0m'));
        return undefined;

    }

    switch (cmd) {
        case 'access':
            break;
        case 'commit':
            await commit();
            break;
        case 'changelog':
            break;
        case 'recall':
            break;
        case 'list':
            await listVers();
            break;
        default:
            console.log(console.log('   \x1b[31mERROR!! cmd: \"' + cmd + '\" DOES NOT EXIT\u001b[0m'));
            break;
    }
}



async function listVers() {
    
    console.log(    '=Version List for ' + mainRepo.Name + '=');

    mainRepo.Versions.forEach((element) => {

        console.log('   ' + element);

    })



}

async function commit() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    commitName = await rl.question('What would you like commit version name to be?  ');
    let commitMsg = await rl.question('COMMIT MSG:   ');
    console.log(mainRepo.Path); //debug
    rl.close();

    if (checkCommitDupe(commitName) !== undefined) {
        
        console.log(console.log('   \x1b[31mERROR!! commit Name: \"' + commitName + '\" already exits\u001b[0m'));

        return ;
    }

    try {

        fs.accessSync(mainRepo.Path + '\\.SVCS', constants.R_OK);

    } catch (e) {

        console.log(    '--> .SVCS file was not found, created .SVCS CONFIG FILE')
        fs.mkdirSync(mainRepo.Path + '\\.SVCS', {recursive: true});

    } finally {

        listOfFiles = fs.readdirSync(mainRepo.Path);
        console.log(listOfFiles);

        listOfFiles.splice(listOfFiles.indexOf('.SVCS'), 1);
        console.log(listOfFiles);

        fs.mkdirSync(mainRepo.Path + '\\.SVCS\\' + commitName);

        fs.writeFileSync(mainRepo.Path + '\\.SVCS\\' + commitName + '\\CommitMsg.txt', commitMsg + '\n\n ============================================');

        listOfFiles.forEach(element => {
            
            console.log(mainRepo.Path + '\\'+ element)
            console.log(mainRepo.Path + '\\.SVCS\\' + commitName)
            fs.cpSync(mainRepo.Path + '\\'+ element, mainRepo.Path + '\\.SVCS\\' + commitName + '\\' + element)

        });

        mainRepo.Versions.push(commitName);

        allRepos.splice(allRepos.findIndex((element) => {

            element.Name === mainRepo.Name;
        }), 1, mainRepo);

        console.log(allRepos);
    }

    saveRepoJson();

}


function checkCommitDupe (commitName) {

        mainRepo.Versions.find( (element) => {

            element === commitName;

        });
}

module.exports = {versHandler};