const path = require( 'path' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

/**
 * @desc Create PNG image of a '.dart' code file using API
 * @return { Promise }
 */
module.exports = async () => {
    await convert( {
        outputFile: path.resolve( __dirname, 'set-data-structure.png' ),
        inputFile: path.resolve( __dirname, 'set-data-structure.dart' ),
        language: LANGUAGES.DART,
        format: IMAGE_FORMATS.PNG,
        theme: THEMES.FIREWATCH,
        ignoreLineNumbers: false,
        scale: 2,
        hasFrame: true,
        frameTitle: 'Dart Sets Data Structure',
        execute: 'dart __FILE__',
        displayCommand: 'dart sets.dart',
    } );

    return path.resolve( __dirname, 'set-data-structure.png' );
};

