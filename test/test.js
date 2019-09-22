const path = require( 'path' );

// dependencies
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// convert code to a file
convert( {
    inputFile: path.resolve( __dirname, 'code.dart' ),
    outputFile: path.resolve( __dirname, 'code.png' ),
    language: LANGUAGES.DART,
    format: IMAGE_FORMATS.PNG,
    padding: '20,30',
    theme: THEMES.FIREWATCH
} );

