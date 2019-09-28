# catage (**ca**t to im**age**)
Node package and CLI tool to convert code into image with syntax highlighting.

[![npm-version](https://img.shields.io/npm/v/catage?style=flat-square)](https://www.npmjs.com/package/catage)
[![dependencies](https://img.shields.io/david/thatisuday/catage?style=flat-square)](https://www.npmjs.com/package/catage)
[![downloads](https://img.shields.io/npm/dt/catage?style=flat-square)](https://www.npmjs.com/package/catage)
[![license](https://img.shields.io/npm/l/catage?style=flat-square)](https://www.npmjs.com/package/catage)

![example](/test/set-data-structure.png?raw=true)

## Install using NPM
```bash
npm install --save catage
npm install --global catage
```

## API
```js
const path = require( 'path' );

// import `convert` function and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( 'catage' );

// convert a code file to an image file
convert( options );
```

### options
| Name | Use | default Value |
| ---- | --- | ------------- |
| inputFile | Required: Relative or absolue path of a code (text) file. | `undefined` |
| outputFile | Required: Relative or absolue of the output image file. | `undefined` |
| language | Language of the code file. | `LANGUAGES.DART` |
| theme | Theme for the syntax highlighting. | `THEMES.FIREWATCH` |
| format | Format of the output image file. | `IMAGE_FORMATS.PNG` |
| ignoreLineNumbers | Avoid adding line numbers to the code. | `false` |
| scale | DPI scale factor of the output image. | `2` |
| hasFrame | Add OSX window frame in the output image. | `true` |
| execute | Execute a command with `inputFile` and inject result in output image file. | `null` |
| displayCommand | An alternative command to display in the output image. | `execute` option value |

> Supported themes: https://iterm2colorschemes.com/ <br>
Supported languages: https://github.com/highlightjs/highlight.js/tree/master/src/languages <br>
Supported image formats: png,jpeg

### Example
```js
const path = require( 'path' );

// import library functions and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// create image of a code file
convert( {

    // by ignoring `outputFile` option, promise resolution will return an image buffer
    outputFile: path.resolve( __dirname, 'set-data-structure.png' ),

    inputFile: path.resolve( __dirname, 'set-data-structure.dart' ),
    language: LANGUAGES.DART,
    format: IMAGE_FORMATS.PNG,
    theme: THEMES.FIREWATCH,
    ignoreLineNumbers: false,
    scale: 2,
    hasFrame: true,
    frameTitle: 'Dart Sets Data Structure',
    execute: 'dart __FILE__', // `__FILE__` placeholder is mandatory
    displayCommand: 'dart sets.dart',
} ).then( () => {
    console.log( 'DONE!' );
} );
```

#### Output Image
![example](/test/set-data-structure.png?raw=true)


## CLI
```
$ catage --help
Usage: catage [options] <inputFile> <outputFile>

Convert code (text) file to an image file

Options:
  -v, --version                       Prints current CLI version.
  -l, --language <language>           Language of the code in the input file
  -t, --theme <theme>                 Theme for the syntax highlighting
  -f, --format <format>               Format of the output image file ( png / jpeg ).
  -s, --scale <scale>                 DPI scale factor of the output image
  --no-line-numbers                   Ignore line numbers in the code
  --no-frame                          Ignore OSX window frame in the output image
  --frame-title <frameTitle>          Title of the OSX window frame
  --execute <execute>                 Command to execute with the code file. You must provide `__FILE__` placeholder in the command string.
  --display-command <displayCommand>  An alternative command to display in the output result.
  -h, --help                          output usage information
```

### 1. Example
```
catage recursive-function.py recursive-function.png -l python --frame-title "Recursive Function" --execute="python3 __FILE__" --display-command="python recursive-function.py"
```

#### Output Image
<img src="/test/recursive-function.png?raw=true" width="500"/>

### 2. Simplest example
```
catage go-defer.go go-defer.png -l go -t AtomOneLight --no-line-numbers --no-frame
```
#### Output Image
<img src="/test/go-defer.png?raw=true" width="500"/>


## Tricks
- If you want to take screenshot of a plain text file (no-language), provide any value to the `language` option that does not listed in supported languages. Since it is a plain text file, you can not use `execute` option. Also the code won't be syntax highlighted.