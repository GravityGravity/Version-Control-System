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
let stringShlState = 'initial>';

//Dependecies
const readline = require('node:readline/promises');
const { repoHandle } = require('./macroRepoHandler.js');
const { parse } = require('node:path');

shlLoop();

/**
 * @description Shell Father Function: infinite loop awaiting commands from user
*/
async function shlLoop () {

        while(true) {       

            const rl = readline.createInterface({

            input: process.stdin,
            output: process.stdout,

            });

            
            //Parse user input
            let line = await rl.question('\u001b[33m<' + __dirname + '>\u001b[0m \u001b[34m' + stringShlState + '\u001b[0m');

            rl.close();

            try {
                line = await parseLine(line);
            } catch(e) {
                console.log(e);
            }

            console.log(line);
            
        //Initial state
            if (shellState === 0) {    

                switch (line[0]) {
                    case 'exit':
                        console.log('...Exiting Sapce Version Control Shell... [exit Called]');
                        rl.close();
                        return ;

                    case 'access':
                        if (getRepo(line[1]) !== undefined) {

                            shellState++;
                            

                        } else {

                            console.log(`   ERROR!! Could not access repository ${line[1]}`);

                        }

                        break;
                    
                    case 'back':
                    
                        shellState--;
                        console.log("Back: Shellstate Reduced"); //debug
                        break;

                    default:
                        try {
                            await repoHandle(line[0], line[1]);
                        } catch (e) {
                            console.log(e);
                            break;
                        }
                    }
                }

                
                
            if (shellState < 0) {
                console.log('...Exiting Sapce Version Control Shell... [Shell State < 0]');
                rl.close();
                return ;
                    
            }

            //There are not shell states below 0 or above 1
            if ((shellState < 0) || (shellState > 1)) {
                console.log('...Exiting Sapce Version Control Shell... [ShellState < 0 OR Shellstate > 1]');
                rl.close();
                return ;
            }     
            
        };
};

/**
 * Parse user command input into an array
 * @param {string} shlInput: user command input as string
*/
function parseLine (shlInput) {
    
    let parseInput = shlInput.toLowerCase();

    parseInput  = parseInput.split(/ (.*)/);

    if (parseInput.length > 4) {

        console.log(`TOO MANY ARGUMENTS IN COMMAND INPUT: 
                [cmd] [RepositoryName (No Spaces)]`);
    }
    
    return parseInput;
};


function initialization () { //Check for repository json file exists with in VCS installation directory

};
