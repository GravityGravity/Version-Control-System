/*  === LONGEST COMMON SUBSEQUENCE .js ===
file desc:
        This file is responsible for finding the longest commmon subsequence
        between two text files.  
        It uses a Bottom-Top Memoization Recursive Approach  

*/



const fs = require('node:fs');
const {orgFileV, newFileV} = require('./fileHandler.js');
let memoGraph; //2D memoization graph to track LCS sub-problems

if (newFileV.length > orgFileV.length) {

    memoGraph = createMemoGraph(newFileV, orgFileV);
    printMGraph(memoGraph);
    LCS(orgFileV, orgFileV.length - 1, newFileV, newFileV.length - 1);
    printMGraph(memoGraph);
    comparator(memoGraph[orgFileV.length - 1][newFileV.length - 1])

} else {

    memoGraph = createMemoGraph(orgFileV, newFileV);
    printMGraph(memoGraph);
    LCS(newFileV, newFileV.length - 1, orgFileV, orgFileV.length - 1);
    printMGraph(memoGraph);
    comparator(memoGraph[newFileV.length - 1][orgFileV.length - 1])
}

/**
 * @Description takes both file word arrays returns a 2D matrix used for memoization
 * @param {Array.length iterable} longArray - Length of array with longer length - x axis
 * @param {Array.length iterable} shortArray- length of array of with shorter length - y axis
 */
function createMemoGraph (longArray, shortArray) {

    console.log(`\u001b[33m     createMemoGraph()\u001b[0m`);

    let twoDimArray = [];

    for (const i of shortArray) {

        twoDimArray.push(new Array(longArray.length).fill(''));
    }

    return twoDimArray;
}

/**
 * @description: Calculates Longest common subsequence using a top-bottom recursive tabulation dynamic programming method
 * @param {Array[]} strArr1 - y axis shorter array
 * @param {int} arr1Len - length of shorter array
 * @param {Array[]} strArr2 - x axis longer array
 * @param {int} arr2Len - length of longer array
 * @returns: Every case returns STRING or NULL
 */
function LCS (strArr1, arr1Len, strArr2, arr2Len) {

    console.log(`\u001b[33m     LCS(Array1, ${arr1Len}, Array2, ${arr2Len})\u001b[0m`);

    if (arr1Len < 0 || arr2Len < 0) {
        //base case: comparing a string to an empty string
        process.stdout.write('base case['+ arr1Len + '][' + arr2Len + ']   \n');
        return '';

    } else if ((memoGraph[arr1Len][arr2Len]) !== '') {

        process.stdout.write('case1   ');
        // console.log("memoGraph[" + arr1Len +"][" + arr2Len + "]");
        return memoGraph[arr1Len][arr2Len];
        //case1: if LCS call is already stored in table, pull from memoization table

    } else if (strArr1[arr1Len] === strArr2[arr2Len]) { //case2: string cmp subproblem is not in memoization table => Check if chars match and write into memoization table
        process.stdout.write('case2   ');
        //Call top left:  	↖ 
        memoGraph[arr1Len][arr2Len] = LCS(strArr1, arr1Len - 1, strArr2, arr2Len -1).concat('~~' + strArr1[arr1Len]);   //Call next ↖ table cell after LCS finishes write to memoization table and return string value in memoization table
        return memoGraph[arr1Len][arr2Len]; //returns string

    } else {

        process.stdout.write('case3   ');
        let temp1 = LCS(strArr1, arr1Len - 1, strArr2, arr2Len); // Call 	 ←-
        let temp2 = LCS(strArr1, arr1Len, strArr2, arr2Len - 1); // Call     ↑ 
        process.stdout.write('case3: temp1:' + temp1 + ' temp2:' + temp2 + '   [' + arr1Len + '][' + arr2Len + ']\n');
        if (temp1.length > temp2.length) {

            memoGraph[arr1Len][arr2Len] = temp1;

            return temp1;

        } else {
            
            memoGraph[arr1Len][arr2Len] = temp2;
            return temp2;

        }

    }

    process.stdout.write('\n NO CASE ERROR ');

}

/**
 * 
 * @param {2D Array} graph 
 */
function printMGraph (graph) {
 
    for (const i of graph) {

        process.stdout.write('       ');

        for (const j of i) {

            process.stdout.write('[' + j + '] ');
        }
    
        process.stdout.write('\n');
    }
}

/**
 * @Description Compares LCS to both file streams. If a words are not a match, add it to changelog signaling DELETION or ADDITION depending on the following Two cases:
 *      Original File: 
 * @param {String} LCSstring 
 * @returns: 
 */
function comparator (LCSstring) {

//     console.log(`\u001b[33m     comparator()\u001b[0m`);
//     let date = new Date();
//     let LCSarray = LCSstring.split('');
//     console.log(LCSarray);

//     // changelog = fs.('Changelog:'+ date, )

}
