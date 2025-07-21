const fs = require('node:fs');

let dateFormat = {

    year: '2-digit',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};


/**
 * @Description Compares LCS to both file streams. If a words are not a match, add it to changelog signaling DELETION or ADDITION depending on the following Two cases:
 *  
 * @param {String} LCSstring 
 * @returns: 
 */
function comparator (LCSstring, prevStream, currStream) {

    let CLadded = '';
    let CLremoved = '';

    let prevStreamItr = 0;
    let currStreamItr = 0;

    console.log(prevStream);
    console.log(currStream);

    console.log(`\u001b[33m     comparator()\u001b[0m`);
    LCSstring = LCSstring.split('~~');
    console.log(LCSstring);

    for (LCSval of LCSstring) {

        for (prevStreamItr; prevStreamItr < prevStream.length; prevStreamItr++) {

            if (prevStream[prevStreamItr] === LCSval) {

            prevStreamItr++;
            break;
            } else {
            
                CLremoved = CLremoved.concat((prevStreamItr + 1) +':   ---' + prevStream[prevStreamItr] + '\n');

            }
        }

        for (currStreamItr; currStreamItr < currStream.length; currStreamItr++) {

            if (currStream[currStreamItr] === LCSval) {
                
            currStreamItr++;
            break;

            } else {

                CLadded = CLadded.concat((currStreamItr + 1) +':   +++' + currStream[currStreamItr] + '\n');
            }
        }
    }

    let date = new Date(Date.now());
    date = date.toLocaleString('en-US', dateFormat);

    console.log(CLremoved); //debug
    console.log(CLadded); //debug
        
    fs.writeFileSync('changelog.txt', '[' + date + ']\n' + CLadded + '\n' + CLremoved + '------------------\n\n', {flag: 'a'} );

    console.log('END OF COMPARATOR');
}

module.exports = { comparator };