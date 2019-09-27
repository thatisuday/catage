const path = require( 'path' );
const child_process = require( 'child_process' );
const emphasize = require( 'emphasize' );
const chalk = require('chalk');
const _ = require( 'lodash' );
const ansiToSVG = require( 'ansi-to-svg' );
const svgToDataURL = require( 'svg-to-dataurl' );

// local dependencies
const { getPaddingValues, takeScreenShot, getSvgDimensions, getExecutableCommand, cleanNestedSVG, formatTerminalOutput } = require( './util' );
const { LANGUAGES, DEFAULT_THEME_COLORS } = require( './constants' );

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
        fontFamily: 'monospace',
        fontSize: 14,
        scale: scale,
        colors: _.isEmpty( theme ) ? DEFAULT_THEME_COLORS : path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` ),
        ...getPaddingValues( padding ),
    } );
};

/**
 * @desc Convert code (text) to SVG image.
 * 
 * @param { object } arguments
 * @param { string } arguments.code - code (text) to render
 * @param { string } arguments.language - language of the code
 * @param { string } arguments.theme - color scheme used to highlight the code and background
 * @param { number | string } arguments.padding - padding between code and image boundaries
 * @param { number } arguments.scale - DPI scale factor
 * @param { number } arguments.ignoreLineNumbers - ignore adding line numbers to the code
 * 
 * @returns { string } - SVG image string
 */
const codeToSvg = exports.codeToSvg = ( { code, language, theme, padding, scale, ignoreLineNumbers } ) => {

    // highlight code syntax in ANSI color format and add line numbers
    const codeAnsiFormat = addLineNumbers( stringToAnsi( code, language ), ignoreLineNumbers );

    // return svg image string
    return ansiTextToSVG( { str: codeAnsiFormat, padding, theme, scale } );
};

/**
 * @desc Convert a SVG image string to PNG or JPG image buffer
 * 
 * @param { object } arguments
 * @param { string } arguments.str - code (with or without in ANSI color format)
 * @param { string } arguments.format - format of the output image (JPG or PNG)
 * @param { number } arguments.scale - DPI scale factor
 * 
 * @return { Promise<Buffer> } - Image binary buffer
 */
exports.svgToImage = async ( { svg, format, scale } ) => {

    // convert SVG text to Data URI
    const dataURI = svgToDataURL( svg );

    // get image dimensions from the SVG image
    const dimensions = getSvgDimensions( svg );

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
const executeCodeFile = exports.executeCodeFile = ( { inputFilePath, command } ) => {
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
 * @desc Execute code file with provided command and return the result as SVG string.
 * 
 * @param { object } arguments
 * @param { string } arguments.inputFilePath - input file path of the code file
 * @param { string } arguments.execute - command to execute with given code file
 * @param { string } arguments.scale - DPI scale factor
 * @param { string } arguments.width - required width of the SVG image
 * 
 * @returns { Promise<string> } - return execution result 
 */
exports.getExecutionResultSVG = async ( { inputFilePath, execute, scale, width } ) => {

    // generate command by replacing `__INPUT_FILE__` placeholder in `execute` string
    const command = getExecutableCommand( inputFilePath, execute );

    // execute code file and get result
    const result = await executeCodeFile( { inputFilePath, command } );
    
    // format terminal output string
    const terminalOutput = formatTerminalOutput( command, result );

    // create SVG image from `terminalOutput` string
    const resultSvg = codeToSvg( { code: terminalOutput, padding: '30,0', scale, ignoreLineNumbers: true } );

    // wrap `resultSvg` in terminal window
    return getTerminalWindowSvg( resultSvg, width );

};

/**
 * @desc Return OSX window frame header SVG
 * 
 * @param { number } width - width of the frame
 * @param { string } title - title of the window
 * 
 * @returns { string } - SVG string
 */
exports.getOsxWindowSvg = ( width, title = 'running code' ) => {
    return `
        <svg viewBox="0, 0, ${ width }, 30" font-family="monospace" font-size="14">
            <rect x="0" y="0" width="${ width }" height="30" fill="#E0E0E0" />
            <g>
                <circle cx="25" cy="15" r="7" fill="#FF605F" />
                <circle cx="50" cy="15" r="7" fill="#FCBC42" />
                <circle cx="75" cy="15" r="7" fill="#0ACA4E" />
            </g>
            
            <text x="50%" y="19" fill="#666666" font-weigh="bold" text-anchor="middle">${ _.toUpper( title ) }</text>
        </svg>
    `;
}

/**
 * @desc Return execution result SVG in a pretty terminal window
 * 
 * @param { string } svg - SVG of code execution result
 * @param { number } width - width of the window
 * 
 * @returns { string } - SVG string
 */
const getTerminalWindowSvg = exports.getTerminalWindowSvg = ( svg, width ) => {

    // original SVG dimensions
    const dimensions = getSvgDimensions( svg );

    // total SVG height
    const svgHeight = dimensions.height + 31;

    return `
        <svg viewBox="0, 0, ${ width }, ${ svgHeight }">
            <rect x="0" y="0" width="${ width }" height="${ svgHeight }" fill="#282828" />
            <rect x="0" y="0" width="${ width }" height="1" fill="#333333" />
            <rect x="1" y="30" width="${ width - 1 }" height="2" fill="#1F1F1F" />
            
            <g>
                <!-- head -->
                <g font-family="monospace" font-size="14">
                    <rect x="0" y="1" width="${ width }" height="30" fill="#222222" />
                    <text x="30" y="20" fill="#999999" font-weight="bold">TERMINAL</text>
                    <rect x="20" y="29" width="86" height="2" fill="#4E89C4" rx="1" ry="1" />
                </g>
            
                <!-- result svg -->
                ${ cleanNestedSVG( svg, 0, 31 ) }
            </g>
        </svg>
    `;
}

/**
 * @desc Create final SVG with `header`, `body` and `footer`.
 * 
 * @param { object } arguments
 * @param { string } arguments.header - OSX window frame
 * @param { string } arguments.body - code SVG image
 * @param { string } arguments.footer - SVG of execution result of the code
 * @param { number } arguments.cornerRadius - corner radius of the image
 * 
 * @returns { string } - return SVG string
 */
exports.createFinalSVG = ( { header, body, footer, cornerRadius } ) => {

    const headerDimensions =  ! _.isEmpty( header ) ? getSvgDimensions( header ) : { width: 0, height: 0 };
    const bodyDimensions =  ! _.isEmpty( body ) ? getSvgDimensions( body ) : { width: 0, height: 0 };
    const footerDimensions =  ! _.isEmpty( footer ) ? getSvgDimensions( footer ) : { width: 0, height: 0 };

    // final SVG width and height
    const svgWidth = bodyDimensions.width; // maximum width
    const svgHeight = headerDimensions.height + bodyDimensions.height + footerDimensions.height;

    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${ svgWidth }" height="${ svgHeight }" viewBox="0, 0, ${ svgWidth }, ${ svgHeight }">
            <clipPath id="clipPath">
                <rect x="0" y="0" width="${ svgWidth }" height="${ svgHeight }" rx="${ cornerRadius }" ry="${ cornerRadius }" />
            </clipPath>
            
            <g clip-path="url(#clipPath)">
                <!-- header -->
                ${ _.isEmpty( header ) ? '' : cleanNestedSVG( header ) }

                <!-- body -->
                ${ _.isEmpty( body ) ? '' : cleanNestedSVG( body, 0, headerDimensions.height ) }

                <!-- footer -->
                ${ _.isEmpty( footer ) ? '' : cleanNestedSVG( footer, 0, headerDimensions.height + bodyDimensions.height ) }
            </g>
        </svg>
    `;
};