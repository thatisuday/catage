# catage (**ca**t to im**age**)
Node package and CLI tool to convert code into image with syntax highlighting.

## Install using NPM
```bash
npm install --save catage
```

## API
```js
const path = require( 'path' );

// import convert function and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( 'catage' );

// output code of `code` in `code.png` file
convert( options );
```

### options
| Name | Use | default Value |
| ---- | --- | ------------- |
| inputFile | Relative or absolue path of a code (text) file | undefined |
| outputFile | Relative or absolue of the output image file | undefined |
| language | Language of the code file | LANGUAGES.DART |
| theme | Theme for the syntax highlighting | THEMES.FIREWATCH |
| padding | Gap between code and image edges. Value could be string or a number | '20,30' |
| format | Format of the output image file | IMAGE_FORMATS.PNG |

> Supported themes: https://iterm2colorschemes.com/ <br>
Supported languages: https://github.com/highlightjs/highlight.js/tree/master/src/languages <br>
Supported image formats: jpeg,jpg

## Example
```js
const path = require( 'path' );

// import convert function and constants
const { convert, IMAGE_FORMATS, LANGUAGES, THEMES } = require( '../' );

// output code of `code` in `code.png` file
convert( {
    inputFile: path.resolve( __dirname, 'code.dart' ),
    outputFile: path.resolve( __dirname, 'code.png' ),
    language: LANGUAGES.DART,
    theme: THEMES.FIREWATCH,
    padding: '20,30',
    format: IMAGE_FORMATS.PNG,
} );
```

![example](/test/code.png?raw=true)


## Upcoming changes
- CLI tool to convert code to image files
- Ability to add output image corner radius [optional]
- Adding MacOS window frame to the output image [optional]
- Executing code file and compositing output image with the results [optional]
