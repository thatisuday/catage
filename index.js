const fs = require( 'fs-extra' );
const path = require( 'path' );
const _ = require( 'lodash' );
const sharp = require( 'sharp' );

// library functions
const { getExecutableCommand, formatTerminalOutput, getClippingMask, getImageDimensions, getWindowFrame, getSvgDimensions } = require( './lib/util' );
const { executeCodeFile, codeToImageBuffer, appendImage, addCornerRadius, addLineNumbers, stringToAnsi, ansiTextToSVG , createFinalSVG, svgToImage } = require( './lib/functions' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/constants' );

// current working directory
const CWD = process.cwd();

// return buffer or write it to a file
const bufferReturnOrWrite = ( outputFilePath, buffer ) => {
    if( undefined !== outputFilePath ) {
        return fs.writeFile( outputFilePath, buffer );
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
    scale = 2,
    execute = null,
} ) => {

    // absolute paths
    const inputFilePath = path.resolve( CWD, inputFile );
    const outputFilePath = _.isEmpty( outputFile ) ? undefined : path.resolve( CWD, outputFile );

    // read input file in text format
    const code = fs.readFileSync( inputFilePath, { encoding: 'utf-8' } );

    // convert SVG string to an image buffer
    // const codeImage = await codeToImageBuffer( { code, language, format, padding, theme, scale, ignoreLineNumbers } );

    /*********************/

    // highlight code syntax in ANSI color format and add line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ), ignoreLineNumbers );

    // convert ANSI formatted text to SVG string
    const bodySVG = ansiTextToSVG( {
        str: codeAnsiFormat,
        padding,
        theme,
        scale
    } );

    // get body svg dim
    const bodySvgDim = getSvgDimensions( bodySVG );
    const headSVG = getWindowFrame( bodySvgDim.width, 'Running Dart Code' );

    // execute a file and get results
    const codeExecResult = await executeCodeFile( { inputFilePath, execute } );

    // executed command
    const executedCommand = getExecutableCommand( inputFilePath, execute );

    // create terminal output string
    const terminalOutput = formatTerminalOutput( executedCommand, codeExecResult );

    const resultAnsiFormat = addLineNumbers( stringToAnsi( terminalOutput, null ), true );

    const resultSVG = ansiTextToSVG( {
        str: resultAnsiFormat,
        padding,
        scale
    } );

    const finalSVG = createFinalSVG( { header: headSVG, body: bodySVG, footer: resultSVG, cornerRadius: 3 } );

    const finalImageBuffer = await svgToImage( { svg: finalSVG, format, scale } );



    return bufferReturnOrWrite( outputFilePath, finalImageBuffer );


    /*********************/


    return null

    // execute code and append result to the output image
    if( execute !== null ) {

        // execute a file and get results
        const codeExecResult = await executeCodeFile( { inputFilePath, execute } );

        // executed command
        const executedCommand = getExecutableCommand( inputFilePath, execute );

        // create terminal output string
        const terminalOutput = formatTerminalOutput( executedCommand, codeExecResult );

        // image of the execution result
        const resultImage = await codeToImageBuffer( { code: terminalOutput, language: null, format, padding, theme, scale, ignoreLineNumbers: true } );

        // final putput image
        const finalImage = await appendImage( { masterImage: codeImage, childImage: resultImage, scale, padding } );

        // return composite image buffer
        const finalImageWithCornerRadius = await addCornerRadius( { image: finalImage, radius: 30 } );

        // return or write buffer
        return bufferReturnOrWrite( outputFilePath, finalImageWithCornerRadius );
    }

    // return or write buffer
    return bufferReturnOrWrite( outputFilePath, codeImage );
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};