const path = require( 'path' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// convert code to a file
convert( {

    // by providing `outputFile`, it will be created instead of returning the image buffer
    outputFile: path.resolve( __dirname, 'code.png' ),

    inputFile: path.resolve( __dirname, 'code.dart' ),
    language: LANGUAGES.DART,
    format: IMAGE_FORMATS.PNG,
    padding: '30,20',
    theme: THEMES.FIREWATCH,
    execute: 'dart __INPUT_FILE__'
} ).then( () => {
    console.log( 'DONE!' );
} );

