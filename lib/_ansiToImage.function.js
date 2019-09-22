const path = require( 'path' );
const _ = require( 'lodash' );
const ansiToImage = require( 'ansi-to-image' );

// get padding values for each direction
const getPaddingValues = ( padding ) => {
    if( _.isNumber( padding ) ) {
        return {
            paddingLeft: padding,
            paddingRight: padding,
            paddingTop: padding,
            paddingBottom: padding,
        };
    } else if ( _.isEmpty( padding ) ) {
        return {
            paddingLeft: 20,
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
 * Convert ANSI text format to an image file.
 */
exports.ansiToImage = ( { str, outputFile, format, padding, theme } ) => {

    return ansiToImage( str, {
        scale: 2,
        quality: 100,
        filename: outputFile,
        type: format,
        colors: path.resolve( __dirname, `../assets/iterm-themes/${ theme }.itermcolors` ),
        ...getPaddingValues( padding ),
    } );
};
