const path = require( 'path' );
const fs = require( 'fs' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// convert code to a file
convert( {
    inputFile: path.resolve( __dirname, 'code.dart' ),
    language: LANGUAGES.DART,
    outputFile: path.resolve( __dirname, 'codec.png' ),
    format: IMAGE_FORMATS.PNG,
    padding: '20,30',
    theme: THEMES.FIREWATCH
} ).then( imageBuffer => {


    // save buffer to an image file
    const outputFile = path.resolve( __dirname, 'code.png' );
    fs.writeFileSync( outputFile, imageBuffer );
} );

