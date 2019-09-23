const fs = require( 'fs-extra' );
const path = require( 'path' );
const _ = require( 'lodash' );

// library functions
const { stringToAnsi, addLineNumbers, ansiToSVG, svgToImage } = require( './lib/functions' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/constants' );

// current working directory
const CWD = process.cwd();

/**
 * @desc Converts a string (code) to an image with syntax highlighting
 */
const convert = async ( {
    inputFile,
    outputFile,
    language = LANGUAGES.DART,
    format = IMAGE_FORMATS.PNG,
    padding = '20,30',
    theme = THEMES.FIREWATCH,
} ) => {

    // absolute paths
    const inputFilePath = path.resolve( CWD, inputFile );
    const outputFilePath = _.isEmpty( outputFile ) ? undefined : path.resolve( CWD, outputFile );

    // read input file in text format
    const code = fs.readFileSync( inputFilePath, { encoding: 'utf-8' } );
    
    // convert string to ANSI with syntax highlighting and add line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ) );

    // convert ANSI text SVG string
    const svg = ansiToSVG( {
        str: codeAnsiFormat,
        padding,
        theme
    } );

    // convert SVG string to an image buffer
    const imageBuffer = await svgToImage( { svg, format } );

    // save `imageBuffer` to local file or return `imageBuffer`
    if( undefined !== outputFilePath ) {
        return fs.writeFile( outputFile, imageBuffer );
    } else {
        return imageBuffer;
    }
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};