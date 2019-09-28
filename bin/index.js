#!/usr/bin/env node

const program = require( 'commander' );
const _ = require( 'lodash' );

// import package.json
const package = require( '../package.json' );

// import library functions and constants
const { convert } = require( '../' );

// intialize CLI interface
program
.version( package.version, '-v, --version', 'Prints current CLI version.' )
.description( 'Convert code (text) file to an image file' )

// command arguments (required)
.arguments( '<inputFile> <outputFile>' )

// command line flags
.option( '-l, --language <language>', 'Language of the code in the input file' )
.option( '-t, --theme <theme>', 'Theme for the syntax highlighting' )
.option( '-f, --format <format>', 'Format of the output image file ( png / jpeg ).' )
.option( '-s, --scale <scale>', 'DPI scale factor of the output image' )
.option( '--no-line-numbers', 'Ignore line numbers in the code' )
.option( '--no-frame', 'Ignore OSX window frame in the output image' )
.option( '--frame-title <frameTitle>', 'Title of the OSX window frame' )
.option( '--execute <execute>', 'Command to execute with the code file. You must provide `__FILE__` placeholder in the command string.' )
.option( '--display-command <displayCommand>', 'An alternative command to display in the output result.' )

// perform action
.action( ( inputFile, outputFile, opts ) => {

    // final `convert` options
    const options = {
        language: opts.language,
        theme: opts.theme,
        format: opts.format,
        scale: opts.scale,
        ignoreLineNumbers: ! opts.lineNumbers,
        hasFrame: opts.frame,
        frameTitle: opts.frameTitle,
        execute: opts.execute,
        displayCommand: opts.displayCommand,
    };

    // convert code file to an image
    convert( {
        inputFile,
        outputFile,
        ...options
    } );
    
} )
;

// parse command line argument vector
program.parse( process.argv );
