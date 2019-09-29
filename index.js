const fs = require( 'fs-extra' );
const path = require( 'path' );
const _ = require( 'lodash' );

// library functions
const { getSvgDimensions, getThemeColors } = require( './lib/util' );
const { codeToSvg, createFinalSVG, svgToImage, getOsxWindowSvg, getExecutionResultSVG } = require( './lib/functions' );
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
    theme = THEMES.FIREWATCH,
    format = IMAGE_FORMATS.PNG,
    ignoreLineNumbers = false,
    scale = 2,
    hasFrame = true,
    frameTitle = 'Code Snippet',
    execute = null,
    displayCommand = null,
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
    svgImages.body.svg = codeToSvg( { code, language, theme, padding: '20,20', scale, ignoreLineNumbers } );
    svgImages.body.dimensions = getSvgDimensions( svgImages.body.svg );

    // create SVG image for OSX window frame
    if( hasFrame ) {
        svgImages.header.svg = getOsxWindowSvg( svgImages.body.dimensions.width, frameTitle );
        svgImages.header.dimensions = getSvgDimensions( svgImages.header.svg );
    }

    // execute code file
    if( execute ) {
        svgImages.footer.svg = await getExecutionResultSVG( { inputFilePath, execute, displayCommand, theme, scale, width: svgImages.body.dimensions.width } );
        svgImages.footer.dimensions = getSvgDimensions( svgImages.footer.svg );
    }

    const finalSVG = createFinalSVG( {
        header: svgImages.header.svg,
        body: svgImages.body.svg,
        footer: svgImages.footer.svg,
        cornerRadius: 5
    } );

    switch( format ) {
        case IMAGE_FORMATS.SVG:
            return returnBufferOrWrite( outputFilePath, finalSVG );

        case IMAGE_FORMATS.JPG:
            format = IMAGE_FORMATS.JPEG; // jshint ignore:line
        case IMAGE_FORMATS.JPEG:
        case IMAGE_FORMATS.PNG:
            const finalImageBuffer = await svgToImage( { svg: finalSVG, format, scale } );
            return returnBufferOrWrite( outputFilePath, finalImageBuffer );
    }
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};