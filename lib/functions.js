const path = require( 'path' );
const child_process = require( 'child_process' );
const emphasize = require( 'emphasize' );
const chalk = require('chalk');
const _ = require( 'lodash' );
const ansiToSVG = require( 'ansi-to-svg' );
const svgToDataURL = require( 'svg-to-dataurl' );
const sharp = require( 'sharp' );

// local dependencies
const { getPaddingValues, takeScreenShot, getSvgDimensions, getBackgroundPatch, getExecutableCommand } = require( './util' );
const { LANGUAGES } = require( './constants' );

/**********************************************************************************/

/**
 * @desc Highlight a code (text) and return ANSI text format (string value).
 */
const stringToAnsi = exports.stringToAnsi = ( str, laguage ) => {

    // if `language` is not supported, return `str` back without highlighting
    if( ! _.includes( _.values( LANGUAGES ), laguage ) ) {
        return str;
    }

    // highlight `str` using `emphasize` in ANSI text format
    const { value } = emphasize.highlight( laguage, str );

    return value;
};

/**
 * @desc Add line number to each line in a string (in ANSI format).
 */
const addLineNumbers = exports.addLineNumbers = ( str, isDisabled ) => {

    // if adding line number is disabled, return `str`
    if( true === isDisabled ) {
        return str;
    }

    // create an array of lines
    var lines = str.split( /\r?\n/ );

    // return lines with line numbers joined by a newline character
    return lines.map( ( line, i ) => {

        // default line number
        let lineNumber = `${ i + 1 } : `;

        // if line number is less than 100, add left padding
        if( ( i + 1 ) < 10 ) {
            lineNumber = `  ${ lineNumber }`; // 2 space padding
        } else if( ( i + 1 ) < 100 ) {
            lineNumber = ` ${ lineNumber }`; // 1 space padding
        }

        // prepend line number to the `line` string
        return chalk.grey( lineNumber ) + line;
    } ).join( '\n' );
};


/**
 * @desc Convert ANSI text to an SVG image string.
 */
const ansiTextToSVG = exports.ansiTextToSVG = ( { str, padding, theme } ) => {

    return ansiToSVG( str, {
        fontFace: 'monospace',
        fontSize: 14,
        scale: 2,
        colors: path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` ),
        ...getPaddingValues( padding ),
    } );
};

/**
 * @desc Convert a SVG string to image format.
 * @return {*} - Image binary buffer in a Promise
 */
const svgToImage = exports.svgToImage = async ( { svg, format, scale, imageSize } ) => {

    // convert SVG text to Data URI
    const dataURI = svgToDataURL( svg );

    // get image dimensions for output image
    const dimensions = ( ! _.isEmpty( imageSize ) ) ? imageSize : getSvgDimensions( svg );

    // get image buffer from screenshot
    const buffer = await takeScreenShot( { dataURI, format, dimensions, scale } );

    // return screenshot image buffer data and dimensions
    return { buffer, dimensions };
};

/**
 * @desc Execute code file and return the result
 * @return {*} - Promise<string>
 */
exports.executeCodeFile = ( { inputFilePath, execute } ) => {

    // generate command by replacing `__INPUT_FILE__` placeholder in `execute` string
    const command = getExecutableCommand( inputFilePath, execute );

    return new Promise( ( resolve, reject ) => {
        child_process.exec( command, ( error, stdOut, stdError ) => {
            if( error !== null && ! isEmpty( stdError ) ) {
                reject( `Failed to exeucte command: ${ execute } from file ${ inputFilePath }.` );
            } else {
                resolve( stdOut );
            }
        } );
    } );
};


/**
 * @desc convert `code` to `image` buffer
 */
exports.codeToImageBuffer = async ( { code, language, format, padding, theme, scale, imageSize, ignoreLineNumbers } ) => {
    
    // convert string to ANSI with syntax highlighting and line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ), ignoreLineNumbers );

    // convert ANSI text SVG string
    const svg = ansiTextToSVG( {
        str: codeAnsiFormat,
        padding,
        theme
    } );

    // convert SVG string to an image buffer
    const { buffer, dimensions } = await svgToImage( { svg, format, imageSize, scale } );

    // return buffer of the output image
    return { buffer, dimensions };
};

/**
 * @desc Append child image to master image
 * @param scale - scale factor used in `util.takeScreenShot` function
 */
exports.appendImage = async ( { masterImage, childImage, scale, padding } ) => {

    // get padding values
    const paddingValues = getPaddingValues( padding );
    
    // resize child image to match master image width
    const childImageBuffer = await sharp( childImage.buffer )
    .resize( { width: ( masterImage.dimensions.width * scale ), fit: 'inside', withoutEnlargement: true } )
    .toBuffer();

    // background patch of master image
    const backgroundPatch = await getBackgroundPatch( masterImage.buffer );

    // blank canvas to add to master image
    const canvas = await sharp( backgroundPatch )
    .resize( { width: masterImage.dimensions.width, height: ( childImage.dimensions.height - paddingValues.paddingBottom ) } )
    .toBuffer();
    
    // append canvas to master image
    // -2px offset top to avoid transparent line
    const extendedMasterImageBuffer = await sharp( masterImage.buffer )
    .resize( { width: masterImage.dimensions.width, height: ( masterImage.dimensions.height + childImage.dimensions.height - paddingValues.paddingBottom - 2 ), fit: 'contain', position: 'left top' } )
    .composite( [ { input: canvas, gravity: 'southeast', top: ( masterImage.dimensions.height ), left: 0 } ] )
    .toBuffer();
    
    // create composite image of master and child image
    const finalImage = await sharp( extendedMasterImageBuffer )
    .composite( [ { input: childImageBuffer, gravity: 'southeast', top: ( masterImage.dimensions.height - paddingValues.paddingTop ), left: 0 } ] )
    .toBuffer();

    return finalImage;
};
