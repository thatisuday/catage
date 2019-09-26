const path = require( 'path' );
const child_process = require( 'child_process' );
const emphasize = require( 'emphasize' );
const chalk = require('chalk');
const _ = require( 'lodash' );
const ansiToSVG = require( 'ansi-to-svg' );
const svgToDataURL = require( 'svg-to-dataurl' );
const sharp = require( 'sharp' );

// local dependencies
const { getPaddingValues, takeScreenShot, getSvgDimensions, getBackgroundPatch, getExecutableCommand, getImageDimensions } = require( './util' );
const { LANGUAGES } = require( './constants' );

/**********************************************************************************/

/**
 * @desc Highlight code in ANSI color format.
 * @param { string } str - code (text)
 * @param { string } laguage - language of the code (`null` if code has no language)
 */
const stringToAnsi = exports.stringToAnsi = ( str, laguage ) => {

    // if `language` is not supported, return `str` back without syntax highlighting
    if( ! _.includes( _.values( LANGUAGES ), laguage ) ) {
        return str;
    }

    // highlight `str` using `emphasize` package in ANSI color format
    const { value } = emphasize.highlight( laguage, str );

    // return ANSI formatted string
    return value;
};

/**
 * @desc Add line number to each line in a string.
 * 
 * @param { string } str - code (with or without in ANSI color format)
 * @param { boolean } isDisabled - flag to disable adding line numbers to the code
 * 
 * @param { string } - code with line numbers
 */
const addLineNumbers = exports.addLineNumbers = ( str, isDisabled ) => {

    // if `isDisabled` is `true`, return `str` back without adding line numbers
    if( true === isDisabled ) {
        return str;
    }

    // create an array of lines split by `newline` character
    var lines = str.split( /\r?\n/ );

    // return lines with line numbers joined by a `newline` character
    return lines.map( ( line, i ) => {

        // default line number
        let lineNumber = `${ i + 1 } : `;

        // if line number is less than 100, add left padding spaces for alignment
        if( ( i + 1 ) < 10 ) {
            lineNumber = `  ${ lineNumber }`; // 2 spaces padding
        } else if( ( i + 1 ) < 100 ) {
            lineNumber = ` ${ lineNumber }`; // 1 space padding
        }

        // prepend line number to the `line` string
        return chalk.grey( lineNumber ) + line;

    } ).join( '\n' );
};


/**
 * @desc Convert ANSI color formatted string to an SVG image string.
 * 
 * @param { object } arguments
 * @param { string } arguments.str - code (with or without in ANSI color format)
 * @param { string | number } arguments.padding - padding between code and image boundaries
 * @param { string } arguments.theme - color scheme used to highlight the code and background
 * 
 * @returns { string } - SVG image string
 */
const ansiTextToSVG = exports.ansiTextToSVG = ( { str, padding, theme, scale } ) => {

    return ansiToSVG( str, {
        fontFace: 'monospace',
        fontSize: 14,
        scale: scale,
        colors: path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` ),
        ...getPaddingValues( padding ),
    } );
};

/**
 * @desc Convert a SVG image string to PNG or JPG image buffer
 * 
 * @param { object } arguments
 * @param { string } arguments.str - code (with or without in ANSI color format)
 * @param { string } arguments.format - format of the output image (JPG or PNG)
 * @param { number } arguments.scale - DPI scale factor
 * @param { { width: number, height: number } } arguments.imageSize - output image dimensions (automatic if not provided)
 * 
 * @return { Promise<ArrayBuffer> } - Image binary buffer
 */
const svgToImage = exports.svgToImage = async ( { svg, format, scale, imageSize } ) => {

    // convert SVG text to Data URI
    const dataURI = svgToDataURL( svg );

    // get image dimensions (use provided or automatic from the SVG image)
    const dimensions = ( ! _.isEmpty( imageSize ) ) ? imageSize : getSvgDimensions( svg );

    // render SVG in browser and take a screenshop
    const buffer = await takeScreenShot( { dataURI, format, dimensions, scale } );

    // return screenshot image buffer data
    return buffer;
};

/**
 * @desc Execute input code (text) file and return the result.
 * 
 * @param { object } arguments
 * @param { string } arguments.inputFilePath - input file path of the code file
 * @param { string } arguments.execute - command to execute with given code file
 * 
 * @returns { Promise<string> } - return execution result 
 */
exports.executeCodeFile = ( { inputFilePath, execute } ) => {

    // generate command by replacing `__INPUT_FILE__` placeholder in `execute` string
    const command = getExecutableCommand( inputFilePath, execute );

    return new Promise( ( resolve ) => {

        // execute command using child process
        child_process.exec( command, ( error, stdOut, stdError ) => {
            if( error !== null && ! isEmpty( stdError ) ) {

                chalk.red.bold( `Failed to exeucte command: ${ execute } from file ${ inputFilePath }.` );
                throw new Error( error !== null ? error : stdError ); // throw an error

            } else {

                resolve( stdOut ); // resolve with output

            }
        } );
    } );
};


/**
 * @desc convert code string to image buffer
 * 
 * @param { object } arguments
 * @param { string } arguments.code - code (text) to highlight
 * @param { string } arguments.language - language of the code
 * @param { string } arguments.format - format of the output image (JPG or PNG)
 * @param { string | number } arguments.padding - padding between code and image boundaries
 * @param { string } arguments.theme - color scheme used to highlight the code and background
 * @param { number } arguments.scale - DPI scale factor
 * @param { { width: number, height: number } } arguments.imageSize - output image dimensions (automatic if not provided)
 * @param { boolean } arguments.ignoreLineNumbers - flag to disable adding line numbers to the code
 * 
 * @returns { Promise<ArrayBuffer> } - return image buffer
 */
exports.codeToImageBuffer = async ( { code, language, format, padding, theme, scale, imageSize, ignoreLineNumbers } ) => {
    
    // highlight code syntax in ANSI color format and add line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ), ignoreLineNumbers );

    // convert ANSI formatted text to SVG string
    const svg = ansiTextToSVG( {
        str: codeAnsiFormat,
        padding,
        theme,
        scale
    } );

    // convert SVG string to an image buffer
    const svgImageBuffer = await svgToImage( { svg, format, imageSize, scale } );

    // return image buffer
    return svgImageBuffer;
};

/**
 * @desc Append one code image with another code image and return output buffer
 * 
 * @param { object } arguments
 * @param { object } arguments.masterImage - master image buffer
 * @param { object } arguments.childImage - child image buffer (image to place on the master image)
 * @param { string } arguments.padding - padding between code and image boundaries
 * @param { string } arguments.scale - DPI scale factor
 * 
 * @returns { Promise<ArrayBuffer> } - return image buffer
 */
exports.appendImage = async ( { masterImage, childImage, scale, padding } ) => {

    // get padding values
    const paddingValues = getPaddingValues( padding );
    
    // resize child image to match master image width
    const childImageBuffer = await sharp( childImage.buffer )
    .resize( { width: ( masterImage.dimensions.width * scale ), fit: 'inside', withoutEnlargement: true } )
    .toBuffer();

    // background patch of the master image
    const backgroundPatch = await getBackgroundPatch( masterImage.buffer );

    // blank canvas to append at the bottom of the master image
    const canvas = await sharp( backgroundPatch )
    .resize( { width: masterImage.dimensions.width, height: ( childImage.dimensions.height - paddingValues.paddingBottom ) } )
    .toBuffer();
    
    // append canvas to the master image
    // -2px offset top to avoid transparent line
    const extendedMasterImageBuffer = await sharp( masterImage.buffer )
    .resize( { width: masterImage.dimensions.width, height: ( masterImage.dimensions.height + childImage.dimensions.height - paddingValues.paddingBottom - 2 ), fit: 'contain', position: 'left top' } )
    .composite( [ { input: canvas, gravity: 'southeast', top: ( masterImage.dimensions.height ), left: 0 } ] )
    .toBuffer();
    
    // create composite image of master and child image (join vertically)
    const compositeImage = await sharp( extendedMasterImageBuffer )
    .composite( [ { input: childImageBuffer, gravity: 'southeast', top: ( masterImage.dimensions.height - paddingValues.paddingTop ), left: 0 } ] )
    .toBuffer();

    // return composite image buffer
    return compositeImage;
};
