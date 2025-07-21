/*  Space Version Control System: Shell

    File Desc: Holds implementations of shell and handles shell command inputs from user
/* 
OPERATIONS:

STARTUP (LEVEL1):
--DELETE REPOSITORY
--CREATE REPOSITORY
--ACCESS REPOSITORY
--LIST REPOS
!!Close bsh terminal for Space VCS


LEVEL2:
--LIST VERSION NAMES ??== CHANGELOG LIST
--CHANGELOG LIST
--COMMIT
--RECALL


*/

let shellState = 0;

//Dependecies
const readlinePromises = require('node:readline');
const { repoHandle } = require('./repoHandler.js');
const rl = readlinePromises.createInterface({

    input: process.stdin,
    output: process.stdout,

});


run();

function run() { //Runs shell application

    shlLoop();

};



/**
 * @description Shell Father Function: infinite loop awaiting commands from user
*/
function shlLoop () {
    
    return new Promise(function(resolve, reject){
        
        rl.setPrompt('\u001b[33m<' + __dirname + '>\u001b[0m \u001b[34minitial> \u001b[0m');
        
        rl.prompt();
        rl.on('line', async function(line) {       
            
            //Parse user input
            line = await parseLine(line);
            console.log(line);
            
            
            
            
        if (shellState === 0) {    
            //shell state changes
            if (line[0] === "exit") {
                rl.close();
                return ;
            }
            
            if (line[0] === "access") {
                
                shellState++;  
                console.log(shellState); //debug
                
            }
            
            if (line[0] === "back") {
                
                shellState--;
                console.log(shellState); //debug
                
            }
            
            if (shellState < 0) {
                console.log('...Exiting Sapce Version Control Shell... [Shell State < 0]');
                rl.close();
                return ;
                
            }
        }
            
            
            //shell state prompt check
            if (shellState === 0) {
                
                rl.setPrompt('\u001b[33m<' + __dirname + '>\u001b[0m \u001b[34minitial> \u001b[0m');
                
            }
            if (shellState === 1) {
                
                
                rl.setPrompt('\u001b[33m<' + __dirname + '>\u001b[0m \u001b[34m[\'RepoName\']> \u001b[0m'); //add Repo name
            }     
            
            rl.prompt();
        });
    })
    
};

/**
 * Parse user command input into an array
 * @param {string} shlInput: user command input as string
*/
function parseLine (shlInput) {
    
    let parseInput = shlInput.split(/ (.*)/);
    
    return parseInput;
};


function initialization () { //Check for repository json file exists with in VCS installation directory

};


