const path = require( 'path' );
const child_process = require( 'child_process' );

/**
 * @desc Create SVG image of a '.fo' code file using CLI
 * @return { Promise }
 */
module.exports = () => {
    child_process.execSync( 'catage go-defer.go go-defer.svg -l go -t AtomOneLight -f svg --no-line-numbers --no-frame', { stdio: 'inherit', cwd: __dirname } );

    return path.resolve( __dirname, 'go-defer.svg' );
};

