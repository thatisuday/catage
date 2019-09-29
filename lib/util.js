const path = require( 'path' );
const _ = require( 'lodash' );
const puppeteer = require( 'puppeteer' );
const chalk = require( 'chalk' );
const escapeRegexp = require( 'escape-string-regexp' );
const itermColorsToHex = require( 'itermcolors-to-hex' );

// local dependencies
const { IMAGE_FORMATS, DEFAULT_THEME_COLORS, ANSI_COLOR_MAP } = require( './constants' );

/**
 * @desc Create padding value for each side of an image.
 * 
 * @param { string | number } padding - padding in string or number
 * 
 * @return { { paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number } }
 */
exports.getPaddingValues = ( padding ) => {
    if( _.isNumber( padding ) ) {
        return {
            paddingLeft: padding,
            paddingRight: padding + 10,
            paddingTop: padding,
            paddingBottom: padding,
        };
    } else if ( _.isEmpty( padding ) ) {
        return {
            paddingLeft: 20, // `20` is the default padding
            paddingRight: 30,
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
            paddingRight: Number( paddingHorizontal ) + 10,
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
 * @returns { Promise<Buffer> } - image buffer
 */
exports.takeScreenShot = async ( { dataURI, scale, format, dimensions } ) => {

    // open browser
    const browser = await puppeteer.launch( { args: [ '--no-sandbox', '--disable-setuid-sandbox' ] } );
    
    // open browser tab
	const page = await browser.newPage();

    // set viewport of the page
	page.setViewport( {
		width: _.toInteger( dimensions.width ),
		height: _.toInteger( dimensions.height ),
		deviceScaleFactor: _.toInteger( scale )
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
const getSvgDimensions = exports.getSvgDimensions = ( svg ) => {
    
    // get SVG dimensions from `viewBox` attribute value
    const [ , , width, height ] = svg.match( /viewBox="([0-9.]+, [0-9.]+, ([0-9.]+), ([0-9.]+))"/ );

    return {
		width: _.floor( _.toNumber( width ) ),
		height: _.floor( _.toNumber( height ) ),
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
    return commandTemplate.replace( '__FILE__', inputFilePath );
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
${ chalk.green( '$ ➤ ' ) } ${ chalk.bold( command ) }

${ _.trim( result, '\n' ) }
`;
}

/**
 * @desc Modify SVG width and height.
 * 
 * @param { number } params
 * @param { string } params.svg - SVG string
 * @param { number } params.width - new width to apply
 * @param { number } params.height - new height to apply
 * 
 * @returns { string } - SVG string
 */
exports.modifySvgDimensions = ( { svg, width, height } ) => {

    // processed SVG
    let processedSVG = svg;
    
    // original SVG dimensions
    const dimensions = getSvgDimensions( svg );

    // change width using regex
    if( ! _.isNil( width ) ) {

        // replace in width propery
        processedSVG = processedSVG.replace( new RegExp( escapeRegexp( `width="${_.toString( dimensions.width )}"` ) ), `width="${ width }"` );

        // replace in viewBox property
        processedSVG = processedSVG.replace( /viewBox="[^\"]+"/, ( match ) => {
            return match.replace( new RegExp( escapeRegexp( _.toString( dimensions.width ) ), 'g' ), width );
        } );
    }

    // change height using regex
    if( ! _.isNil( height ) ) {
        
        // replace in height propery
        processedSVG = processedSVG.replace( new RegExp( escapeRegexp( `height="${_.toString( dimensions.height )}"` ) ), `height="${ height }"` );

        // replace in viewBox property
        processedSVG = processedSVG.replace( /viewBox="[^\"]+"/, ( match ) => {
            return match.replace( new RegExp( escapeRegexp( _.toString( dimensions.height ) ), 'g' ), height );
        } );
    }

    // return processed SVG
    return processedSVG;
}

/**
 * @desc Prepare nested SVG by adding `width` and `height` attributes
 * and removing unnecessary attributes like `xmlns` and `viewBox`.
 * 
 * @param { string } svg - input SVG image
 * @param { string } x - position from the left
 * @param { string } y - position from the top
 * 
 * @returns { string } - SVG string
 */
exports.cleanNestedSVG = ( svg, x = 0, y = 0 ) => {

    // original SVG dimensions
    const dimensions = getSvgDimensions( svg );

    // remove `viewBox` property
    svg = svg.replace( /\sviewBox="[^\"]+"/, '' );

    // remove `xmlns` property
    svg = svg.replace( /\sxmlns="[^\"]+"/, '' );

    // add `width` and `height` attributes
    svg = svg.replace('<svg', `<svg x="${ x }" y="${ y }" width="${ dimensions.width }" height="${ dimensions.height }" `)

    // return svg
    return svg;
}

/**
 * @desc Return color map of theme
 * 
 * @param { string } theme - theme name
 * 
 * @returns { obect } - color map
 */
exports.getThemeColors = ( theme ) => {
    if( _.isEmpty( theme ) ) {
        return DEFAULT_THEME_COLORS;
    } else {
        const themeFile =  path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` );
        const themeColors = itermColorsToHex( themeFile );

        // construct a map
        return _.fromPairs( _.map( ANSI_COLOR_MAP, ( ansiColorName, colorKey ) => {
            return [ colorKey, themeColors[ ansiColorName ] ];
        } ) );
    }
}