const _ = require( 'lodash' );
const puppeteer = require( 'puppeteer' );

// local dependencies
const { IMAGE_FORMATS } = require( './constants' );

/**
 * @desc Returns padding value for each side
 * @param {*} padding - padding string or number
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

        // formay padding
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
 * @desc An utility function to get screenshot of Data URI using puppeteer.
 * https://www.npmjs.com/package/puppeteer
 * https://github.com/GoogleChrome/puppeteer/blob/v1.20.0/docs/api.md#pagescreenshotoptions
 * 
 * @param {*} dataURI - Data URI of the image
 * @param {*} scale - scale of the screenshot (magnification)
 * @param {*} type - output image format
 * @param {*} dimensions - dimensions of the viewport
 */
exports.takeScreenShot = async ( { dataURI, scale, format, dimensions } ) => {
	const browser = await puppeteer.launch( { args: [ '--no-sandbox', '--disable-setuid-sandbox' ] } );
	const page = await browser.newPage();

    // set viewport of the page
	page.setViewport( {
		width: dimensions.width,
		height: dimensions.height,
		deviceScaleFactor: scale
	} );

    // open `dataURI` in the page
	await page.goto( dataURI );

    // take a screenshot
	const screenshot = await page.screenshot( {
        type: format, // output image format
        omitBackground: true, // take screenshot with transparancy
        quality: format === IMAGE_FORMATS.JPEG ? 100 : undefined, // set `quality: 100` for JPEG format
    } );

    // close browser page
    await browser.close();
    
    // return screenshot buffer
    return screenshot;
}