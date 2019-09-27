const fs = require( 'fs-extra' );
const path = require( 'path' );
const _ = require( 'lodash' );
const sharp = require( 'sharp' );

// library functions
const { getSvgDimensions } = require( './lib/util' );
const { codeToSvg, createFinalSVG, svgToImage, getOsxWindowSvg, getTerminalWindowSvg, getExecutionResultSVG } = require( './lib/functions' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/constants' );

// current working directory
const CWD = process.cwd();

/**
 * @desc Return image buffer or write it to a file.
 * @param {*} outputFilePath - output file path
 * @param {*} buffer - image buffer
 */
const returnBufferOrWrite = ( outputFilePath, buffer ) => {
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
    theme = THEMES.FIREWATCH,
    ignoreLineNumbers = false,
    scale = 2,
    addWindowFrame = true,
    execute = false,
} ) => {

    // absolute paths
    const inputFilePath = path.resolve( CWD, inputFile );
    const outputFilePath = _.isEmpty( outputFile ) ? undefined : path.resolve( CWD, outputFile );

    // read input file in text format
    const code = fs.readFileSync( inputFilePath, { encoding: 'utf-8' } );

    /*********************/

    // header, body and footer SVG images to construct final image
    const svgImages = {

        // OSX window frame
        header: {
            svg: undefined,
            dimensions: undefined
        },

        // actual code
        body: {
            svg: undefined,
            dimensions: undefined
        },

        // terminal result
        footer: {
            svg: undefined,
            dimensions: undefined
        },
    };

    // create SVG image from code with syntax highlighting
    svgImages.body.svg = codeToSvg( { code, language, theme, padding: '20,30', scale, ignoreLineNumbers } );
    svgImages.body.dimensions = getSvgDimensions( svgImages.body.svg );

    // create SVG image for OSX window frame
    if( addWindowFrame ) {
        svgImages.header.svg = getOsxWindowSvg( svgImages.body.dimensions.width, 'Running Dart Code' );
        svgImages.header.dimensions = getSvgDimensions( svgImages.header.svg );
    }

    // execute code file
    if( execute ) {
        svgImages.footer.svg = await getExecutionResultSVG( { inputFilePath, execute, scale, width: svgImages.body.dimensions.width } );
        svgImages.footer.dimensions = getSvgDimensions( svgImages.footer.svg );
    }

    const finalSVG = createFinalSVG( {
        header: svgImages.header.svg,
        body: svgImages.body.svg,
        footer: svgImages.footer.svg,
        cornerRadius: 5
    } );

    const finalImageBuffer = await svgToImage( { svg: finalSVG, format, scale } );

    return returnBufferOrWrite( outputFilePath, finalImageBuffer );
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};