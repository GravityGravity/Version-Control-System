/*  repoHandler.js

    DESC: Handles all commands from the Shell file (Sshl.js) that is related to repositories.


*/

const fs = require('node:fs');
const readline = require('node:readline/promises');
let allRepos = null; //
let repoData = null;

allRepos = JSON.parse(fs.readFileSync('repos.JSON', 'utf-8'));
/**
 * DESC: Command selection switch case:
 * 
 * @param {string} cmd - shell commands
 * @param {string} selectedRepo - OPTIONAL|| Name of Repo
 * @param {int} shlState 
 * @returns: Function calls or Undefined
 */
async function repoHandle(cmd, selectedRepo) {

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
            return deleteRepo(selectedRepo);

        default:
            console.log('   \x1b[31mERROR!! cmd: \"' + cmd + '\" DOES NOT EXIT\u001b[0m');
            return null;
    }
}

/**
 * @description Creates a new repo and appends it to the JSON repo list
 * @param {string} name 
 */
async function createRepo (newRepoName) {

    if(getRepo(newRepoName) === undefined) {
        
        const rl = readline.createInterface({

        input: process.stdin,
        output: process.stdout


        });

        let path = await rl.question('  PLEASE INPUT PATH: ');
        rl.close();


        
        newRepo = {

            name: newRepoName,
            dateCreated: (new Intl.DateTimeFormat("en-US").format(new Date())),
            Path: path, 
            Versions: []

                }

        console.log(newRepo);

        allRepos.push(newRepo);
        let JSONallrepos = JSON.stringify(allRepos, null, "\t");
        
        fs.writeFileSync('./repos.JSON', JSONallrepos);

        console.log(`++Added new Repository: ${newRepoName} to list\n`);
        console.log(allRepos);
        

    } else {

        console.log(`   \x1b[31mERROR!! Repository Name '${newRepoName} already taken\u001b[0m\n`);

    }

}

/**
 * @description Deletes an exiting repo within the JSON list
 * @param {string} repoName
 */
function deleteRepo (repoName) {

    if (getRepo(repoName) !== undefined) {

        allRepos.splice(allRepos.findIndex( ({name}) => name === repoName), 2);

        let JSONallrepos = JSON.stringify(allRepos, null, "\t");
        
        fs.writeFileSync('./repos.JSON', JSONallrepos);

        console.log(`--Deleted new Repository: ${repoName} to list\n`);

    } else {
        
        console.log(`   \x1b[31mERROR!! Repository Name '${repoName} does not exist\u001b[0m\n`)

    }

}

/**
 * @description List all repo names within JSON list
 */
function listRepos () {

    if (allRepos.length > 0) {
        console.log('\n   ==LIST OF REPOS===');

        allRepos.forEach(({name}) => {
    
           console.log('       ' + name);
        
        });

        return ;
    } else {

        console.log('\n   ==LIST OF REPOS===');
        console.log('        ~~none~~');

        return ;
    }
}

/**
 * @description Returns repository Json file data 
 * @param {string} repoName 
 * @returns an object of key-value pairs of repo info
 */
function getRepo (repoName) {
    console.log(allRepos); //debug

    repo = allRepos.find(({name}) => {
        return name === repoName; });

    console.log('GetRepo() found:')
    console.log(repo)
    return repo;
}




module.exports = { repoHandle, getRepo };