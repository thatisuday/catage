const path = require( 'path' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

/**
 * @desc Return JPEG buffer of a '.dart' code file using API
 * @return { Promise }
 */
module.exports = async () => {
    const buffer = await convert( {
        inputFile: path.resolve( __dirname, 'set-data-structure.dart' ),
        language: LANGUAGES.DART,
        format: IMAGE_FORMATS.SVG,
        theme: THEMES.ANDROMEDA,
        ignoreLineNumbers: true,
        scale: 1,
        hasFrame: false,
    } );

    return buffer;
};

