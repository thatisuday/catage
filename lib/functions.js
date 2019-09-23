const emphasize = require( 'emphasize' );
const chalk = require('chalk');
const path = require( 'path' );
const _ = require( 'lodash' );
const ansiToSVG = require( 'ansi-to-svg' );
const svgToDataURL = require( 'svg-to-dataurl' );

// local dependencies
const { getPaddingValues, takeScreenShot } = require( './util' );
const { IMAGE_FORMATS } = require( './constants' );

/**
 * @desc Highlight a code (text) and return ANSI text format (string value).
 */
exports.stringToAnsi = ( str, laguage ) => {

    // highlight `str` using `emphasize` in ANSI text format
    const { value } = emphasize.highlight( laguage, str );

    return value;
};

/**
 * @desc Add line number to each line in a string (in ANSI format).
 */
exports.addLineNumbers = ( str ) => {

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
exports.ansiToSVG = ( { str, padding, theme } ) => {

    return ansiToSVG( str, {
        fontFace: 'monospace',
        scale: 2,
        colors: path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` ),
        ...getPaddingValues( padding ),
    } );
};

/**
 * @desc Convert a SVG string to image format.
 * @return {*} - Image binary buffer in a Promise
 */
exports.svgToImage = async ( { svg, format = IMAGE_FORMATS.PNG, scale = 2 } ) => {

    // get SVG dimensions from `viewBox` attribute value
    const [ , , width, height ] = svg.match( /viewBox="([0-9.]+, [0-9.]+, ([0-9.]+), ([0-9.]+))"/ );
    
    // convert SVG text to Data URI
    const dataURI = svgToDataURL( svg );

    // output image dimensions derived from SVG image
    const dimensions = {
		width: Math.floor( Number( width ) ),
		height: Math.floor( Number( height ) ),
	};

    // return screenshot image buffer data
    return takeScreenShot( { dataURI, scale, format, dimensions } );
};
