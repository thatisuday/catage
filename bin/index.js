#!/usr/bin/env node

const program = require( 'commander' );
const _ = require( 'lodash' );

// import package.json
const package = require( '../package.json' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// intialize CLI interface
program
.version( package.version, '-v, --version', 'Prints current CLI version.' )
.description( 'Convert code (text) file to an image file' )

// command arguments (required)
.arguments( '<inputFile> <outputFile>' )

// command line flags
.option( '-l, --language <language>', 'Language of the code in the input file', LANGUAGES.DART )
.option( '-t, --theme <theme>', 'Theme for the syntax highlighting', THEMES.FIREWATCH )
.option( '-p, --padding <padding>', 'Gap between code and image edges.', '20,30' )
.option( '-f, --format <format>', 'Format of the output image file', IMAGE_FORMATS.PNG )

// perform action
.action( ( inputFile, outputFile, options ) => {

    // convert code file to an image
    convert( {
        inputFile,
        outputFile,
        language: options.language,
        theme: options.theme,
        padding: options.padding,
        format: options.format,
    } );
    
} )
;

// parse command line argument vector
program.parse( process.argv );
