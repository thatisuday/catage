const chalk = require('chalk');

/**
 * Add line numbers to a string in ANSI text format.
 */
exports.addLineNumbers = ( str ) => {

    // create an array of lines
    var lines = str.split( /\r?\n/ );

    // return lines with line numbers joined by a newline character
    return lines.map( ( line, i ) => {

        // default line number
        let lineNumber = `${ i + 1 } : `;

        // if line number is less than 100, add left padding
        if( ( i + 1 ) < 10 ) {
            lineNumber = `  ${ lineNumber }`; // 2 space padding
        } else if( ( i + 1 ) < 100 ) {
            lineNumber = ` ${ lineNumber }`; // 1 space padding
        }

        // prepend line number to the `line` string
        return chalk.grey( lineNumber ) + line;
    } ).join( '\n' );
};
