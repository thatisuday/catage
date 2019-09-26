const fs = require( 'fs-extra' );
const path = require( 'path' );
const _ = require( 'lodash' );

// library functions
const { getExecutableCommand, formatTerminalOutput } = require( './lib/util' );
const { executeCodeFile, codeToImageBuffer, appendImage } = require( './lib/functions' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/constants' );

// current working directory
const CWD = process.cwd();

// return buffer or write it to a file
const bufferReturnOrWrite = ( outputFilePath, buffer ) => {
    if( undefined !== outputFilePath ) {
        return fs.writeFile( outputFile, buffer );
    } else {
        return buffer;
    }
};


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
    ignoreLineNumbers = false,
    imageSize = null, // { width, height }
    scale = 2,
    execute = null,
} ) => {

    // absolute paths
    const inputFilePath = path.resolve( CWD, inputFile );
    const outputFilePath = _.isEmpty( outputFile ) ? undefined : path.resolve( CWD, outputFile );

    // read input file in text format
    const code = fs.readFileSync( inputFilePath, { encoding: 'utf-8' } );

    // convert SVG string to an image buffer
    const masterImage = await codeToImageBuffer( { code, language, format, padding, theme, ignoreLineNumbers, scale, imageSize } );

    // execute code and append result to the output image
    if( execute !== null ) {

        // execute a file and get results
        const codeExecResult = await executeCodeFile( { inputFilePath, execute } );

        // executed command
        const executedCommand = getExecutableCommand( inputFilePath, execute );

        // create terminal output string
        const terminalOutput = formatTerminalOutput( executedCommand, codeExecResult );

        // image of the execution result
        const resultImage = await codeToImageBuffer( { code: terminalOutput, language: null, format, padding, theme, ignoreLineNumbers: true } );

        // final putput image
        const finalImage = await appendImage( { masterImage, childImage: resultImage, scale, padding } );

        // return or write buffer
        return bufferReturnOrWrite( outputFilePath, finalImage );
    }

    // return or write buffer
    return bufferReturnOrWrite( outputFilePath, finalImage );
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};