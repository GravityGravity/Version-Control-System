/*  repoHandler.js

    DESC: Handles all commands from the Shell file (Sshl.js) that is related to repositories.


*/

const fs = require('node:fs');
const { createRequire } = require('node:module');
let allRepos = null;
let repoData = null;

// repoHandle('list', 'FirstRepo', 0);

async function repoHandle(cmd, selectedRepo, shlState) {

    repoData = await getRepo(selectedRepo);

    switch (cmd) {
        case 'access':
            return getRepo(selectedRepo);
        case 'create':
            return createRepo(selectedRepo);
            // return '\u001b[32mRepo Created:\"' + selectedRepo + '\"✓\u001b[0m'
        case 'list':
            return listRepos();
        case 'delete':
            return deleteRepo();
        default:
            console.log('\x1b[31mERROR!! cmd: \"' + cmd + '\" DOES NOT EXIT\u001b[0m');
            return undefined;
    }
}




/**
 * @description Creates a new repo and appends it to the JSON repo list
 * @param {string} name 
 */
function creatRepo (name) {






}

/**
 * @description Deletes an exiting repo within the JSON list
 * @param {string} name
 */
function deleteRepo (name) {

    const index = allRepos.indexOF( );

}

/**
 * @description List all repo names within JSON list
 * @param {string} name
 */
function listRepos () {

    console.log('\n   ==LIST OF REPOS===');

    allRepos.forEach(({name}) => {
    
        console.log('       ' + name);
        
    });


}

/**
 * @description Returns repository Json file data 
 * @param {string} repoName 
 * @returns an object of key-value pairs of repo info
 */
async function getRepo (repoName) {

    repoStr = fs.readFileSync('repos.JSON', 'utf-8');
    allRepos = JSON.parse(repoStr);
    console.log(allRepos); //debug

    repo = allRepos.find(({name}) => {
        return name === repoName; });

    return repo;
}


module.exports = { repoHandle, getRepo };