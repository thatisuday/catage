const path = require( 'path' );
const glob = require( 'glob-promise' );
const _ = require( 'lodash' );

/******************************************************************************/

// get list of support languages for highlight
const languageFiles = glob.sync( path.resolve( __dirname, 'languages/*.js' ) );
const languages = languageFiles.map( languageFile => {
    const fileInfo = path.parse( languageFile );

    // return an array of `key:value` pairs for `fromPairs` to use
    return [ fileInfo.name.replace(/[_\s\-\.]+/, '_').toUpperCase(), fileInfo.name ];
} );

// print languages
// console.log( 'languages: => ', JSON.stringify( _.fromPairs( languages ), null, 2 ) );

/******************************************************************************/

// get list of support terminal themes (iterm)
const themeFiles = glob.sync( path.resolve( __dirname, 'iterm-themes/*.itermcolors' ) );
const themes = themeFiles.map( themeFile => {
    const fileInfo = path.parse( themeFile );
    
    // return an array of `key:value` pairs for `fromPairs` to use
    return [ fileInfo.name.replace(/[_\s\-\.]+/, '_').toUpperCase(), fileInfo.name ];
} );

// print themes
console.log( 'themes: => ', JSON.stringify( _.fromPairs( themes ), null, 2 ) );