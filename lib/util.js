const _ = require( 'lodash' );
const puppeteer = require( 'puppeteer' );
const sharp = require( 'sharp' );
const chalk = require( 'chalk' );
const sizeOf = require( 'buffer-image-size' );

// local dependencies
const { IMAGE_FORMATS } = require( './constants' );

/**
 * @desc Create padding value for each side of an image
 * 
 * @param { string | number } padding - padding in string or number
 * 
 * @return { { paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number } }
 */
exports.getPaddingValues = ( padding ) => {
    if( _.isNumber( padding ) ) {
        return {
            paddingLeft: padding,
            paddingRight: padding,
            paddingTop: padding,
            paddingBottom: padding,
        };
    } else if ( _.isEmpty( padding ) ) {
        return {
            paddingLeft: 20, // `20` is the default padding
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
        };
    } else {

        // spilt string by `,` to receive horizonatal and vertical padding
        const paddings = padding.split( ',' );
        const paddingHorizontal = paddings[ 0 ];
        const paddingVertical = paddings.length > 0 ?  paddings[ 1 ] : paddings[ 0 ];
        
        return {
            paddingLeft: Number( paddingHorizontal ),
            paddingRight: Number( paddingHorizontal ),
            paddingTop: Number( paddingVertical ),
            paddingBottom: Number( paddingVertical ),
        };
    }
};


/**
 * @desc An utility function to get screenshot of a Data URI using `puppeteer`.
 * https://www.npmjs.com/package/puppeteer
 * https://github.com/GoogleChrome/puppeteer/blob/v1.20.0/docs/api.md#pagescreenshotoptions
 * 
 * @param { object } arguments
 * @param { string } arguments.dataURI - Data URI of an image
 * @param { number } scale - DPI scale factor (magnification)
 * @param { string } format - format of the output image (JPG or PNG)
 * @param { { width: number, height: number } } dimensions - output image dimensions (automatic if not provided)
 * 
 * @returns { Promise<ArrayBuffer> } - image buffer
 */
exports.takeScreenShot = async ( { dataURI, scale, format, dimensions } ) => {

    // open browser
    const browser = await puppeteer.launch( { args: [ '--no-sandbox', '--disable-setuid-sandbox' ] } );
    
    // open browser tab
	const page = await browser.newPage();

    // set viewport of the page
	page.setViewport( {
		width: dimensions.width,
		height: dimensions.height,
		deviceScaleFactor: scale
	} );

    // open `dataURI` in the browser tab
	await page.goto( dataURI );

    // take a screenshot
	const screenshot = await page.screenshot( {
        type: _.toLower( format ), // output image format
        omitBackground: true, // take screenshot with transparancy
        quality: format === IMAGE_FORMATS.JPEG ? 100 : undefined, // set `quality: 100` for JPEG format
    } );

    // close browser instance
    await browser.close();
    
    // return screenshot image buffer
    return screenshot;
}

/**
 * @desc Get SVG image dimensions from viewBox attribute.
 * 
 * @param { string } svg - SVG image string
 * 
 * @returns { { width: number, height: number } }
 */
exports.getSvgDimensions = ( svg ) => {
    
    // get SVG dimensions from `viewBox` attribute value
    const [ , , width, height ] = svg.match( /viewBox="([0-9.]+, [0-9.]+, ([0-9.]+), ([0-9.]+))"/ );

    return {
		width: Math.floor( Number( width ) ),
		height: Math.floor( Number( height ) ),
	};
};

/**
 * @desc Get final command to execute a code file.
 * 
 * @param { string } inputFilePath - Input file path of a code file
 * @param { string } commandTemplate - Command template provided by the user
 * 
 * @returns { string } - final command to execute
 */
exports.getExecutableCommand = ( inputFilePath, commandTemplate ) => {
    return commandTemplate.replace( '__INPUT_FILE__', inputFilePath );
}

/**
 * @desc Beautify command execution output.
 * 
 * @param { string } command - command used to execute code file
 * @param { string } result - result of the command execution
 * 
 * @returns { string } - formatted `result` string
 */
exports.formatTerminalOutput = ( command, result ) => {
return `
${ chalk.grey( '----------------------------------' ) }

${ chalk.green( '$ ➤ ' ) } ${ chalk.bold( command ) }

${ result }
`;
}

/**
 * @desc Get backgroud patch image of an image buffer.
 * The patch is 10px X 10px top-left corner of the image.
 * 
 * @param { ArrayBuffer } - input image buffer
 * 
 * @returns { Promise<ArrayBuffer> } - image buffer of the patch
 */
exports.getBackgroundPatch = ( imageBuffer ) => {
    return sharp( imageBuffer )
    .extract( { top: 0, left: 0, width: 10, height: 10 } )
    .toBuffer();
}

/**
 * @desc Get dimensions of an image buffer
 * @param { ArrayBuffer } - image buffer
 * @returns { width: number, height: number } - width and height in pixels
 */
exports.getImageDimensions = ( imageBuffer ) => {
    return sizeOf( imageBuffer );
}

