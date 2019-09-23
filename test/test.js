const path = require( 'path' );
const fs = require( 'fs' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// convert code to a file
convert( {
    outputFile: path.resolve( __dirname, 'code.png' ),
    inputFile: path.resolve( __dirname, 'code.dart' ),
    language: LANGUAGES.DART,
    format: IMAGE_FORMATS.PNG,
    padding: '20,30',
    theme: THEMES.FIREWATCH
} ).then( () => {
    console.log( 'DONE!' );
} );

