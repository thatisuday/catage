const path = require( 'path' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// create image of a code file
convert( {

    // by ignoring `outputFile` option, promise resolution will return an image buffer
    outputFile: path.resolve( __dirname, 'set-data-structure.png' ),

    inputFile: path.resolve( __dirname, 'set-data-structure.dart' ),
    language: LANGUAGES.DART,
    format: IMAGE_FORMATS.PNG,
    theme: THEMES.FIREWATCH,
    ignoreLineNumbers: false,
    scale: 2,
    hasFrame: true,
    frameTitle: 'Dart Sets Data Structure',
    execute: 'dart __FILE__', // `__FILE__` placeholder is mandatory
    displayCommand: 'dart sets.dart',
} ).then( () => {
    console.log( 'DONE!' );
} );

