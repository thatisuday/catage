const fs = require( 'fs' );

// library functions
const { stringToAnsi } = require( './lib/_stringToAnsi.function' );
const { addLineNumbers } = require( './lib/_addLineNumbers.function' );
const { ansiToImage } = require( './lib/_ansiToImage.function' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/_constants' );

/**
 * convert function converts a string (code) to an image
 * with syntax highlighting
 */
const convert = ( { inputFile, language, format, padding, theme, outputFile } ) => {

    // read input file in text format
    const code = fs.readFileSync( inputFile, { encoding: 'utf-8' } );

    // convert string to ANSI with syntax highlighting and add line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ) );

    ansiToImage( {
        str: codeAnsiFormat,
        outputFile,
        format,
        padding,
        theme
    } );
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};