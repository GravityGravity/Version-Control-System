
const fs = require('node:fs'); //Loads NodeJS file system modules
console.log(`\n...\u001b[37;43mFILEHANDLER.JS\u001b[0m`); //DEBUG



const orgFileV = fileToWordArray('exampleDir/textV1.txt', 'Original');
const newFileV = fileToWordArray('exampleDir/textV2.txt', 'Current');

/**
 * @param {string} path - path of src code txt file (utf8 encoding)
 * @param {string} fileName - Name of file (usually current/original) helps track when DEBUGGING
 * @returns - Array of Strings with each index containing a single word
 */
function fileToWordArray (path, fileName) {    //returns long file string into a array of words excluding any non-printable chars

    console.log(`\u001b[33m     fileToWordArray()\u001b[0m ( PATH: ${path}, file: ${fileName})`);

    //Check if machine has access to path if not return error (NodeJS:FS module)
    try {   
        fs.accessSync(path, fs.constants.R_OK);
        console.log('\u001b[32mcan read/write ✓\u001b[0m');

    } catch (err) {
        console.error('\x1b[31m' + path + '  ERROR: no access X\x1b[0m');
    }

    //Read file into string (NodeJS:FS module)
    fileName = fs.readFileSync(path, 'utf8');

    //Santized orginial file keeping only {\n and any non-special chars} (ES6:replace() prototype)
    fileName = fileName.replace(/[^\w\n ]/g, '');

    process.stdout.write(JSON.stringify(fileName) + '\n');  //DEBUG: prints txt from file with Non-printable Chars showing

    return fileName.split('\n');  //return array of words
}

console.log(orgFileV);

module.exports = { orgFileV, newFileV };


