const emphasize = require( 'emphasize' );

/**
 * Highlight a string (code) in ANSI text format.
 */
exports.stringToAnsi = ( str, laguage ) => {

    // highlight `str` using `emphasize` in ANSI text format
    const { value } = emphasize.highlight( laguage, str );

    return value;
};
