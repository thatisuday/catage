const fs = require( 'fs-extra' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const _ = require( 'lodash' );
const pretty = require( 'pretty' );

// library functions
const { getSvgDimensions } = require( './lib/util' );
const { codeToSvg, createFinalSVG, svgToImage, getOsxWindowSvg, getExecutionResultSVG } = require( './lib/functions' );
const { IMAGE_FORMATS, LANGUAGES, THEMES } = require( './lib/constants' );

// current working directory
const CWD = process.cwd();

/**
 * @desc Return image buffer or write it to a file.
 * @param {*} path - output file path
 * @param {*} buffer - image buffer
 */
const returnBufferOrWrite = ( path, buffer ) => {
    if( undefined !== path ) {
        return fs.writeFile( path, buffer );
    } else {
        return buffer;
    }
}

/**
 * @desc Process final SVG image
 * @param { string } path - output file path
 * @param { string } svg - final SVG image string
 * @param { string } format - output image format
 * @param { number } scale - DPI scale factor
 */
const processFinalSvg = async ( { path, svg, format, scale } ) => {

    // override JPG alias
    format = _.toLower( format );
    format = ( format === IMAGE_FORMATS.JPG ) ? IMAGE_FORMATS.JPEG : format;

    // return SVG image or convert to portable image formats
    switch( format ) {

        // return SVG image
        case IMAGE_FORMATS.SVG: {
            return returnBufferOrWrite( path, Buffer.from( pretty( svg, { ocd: true } ), 'utf-8' ) );
        }
        
        // convert SVG to portable image formats
        case IMAGE_FORMATS.JPEG:
        case IMAGE_FORMATS.PNG: {
            const buffer = await svgToImage( { svg, format, scale } );
            return returnBufferOrWrite( path, buffer );
        }

        // show error if image format is invalid
        default: {
            console.log( chalk.red( `${ chalk.bold( format ) } is invalid image format. Valid formats are ${ _.join( _.values( IMAGE_FORMATS ), ', ' ) }.` ) );
            process.exit( 0 );
        }
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

    // create final SVG by merging header, body and footer
    const finalSVG = createFinalSVG( {
        header: svgImages.header.svg,
        body: svgImages.body.svg,
        footer: svgImages.footer.svg,
        cornerRadius: 5
    } );

    // process SVG image
    return await processFinalSvg( { path: outputFilePath, svg: finalSVG, format, scale } );
};

/******************************/

module.exports = {
    convert,
    IMAGE_FORMATS,
    LANGUAGES,
    THEMES
};