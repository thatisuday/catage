const path = require( 'path' );
const child_process = require( 'child_process' );

/**
 * @desc Create PNG image of a '.py' code file using CLI
 * @return { Promise }
 */
module.exports = () => {
    child_process.execSync( 'catage recursive-function.py recursive-function.png -l python -t "Builtin Solarized Light" --frame-title "Recursive Function" --execute="python3 __FILE__" --display-command="python recursive-function.py"', { stdio: 'inherit', cwd: __dirname } );

    return path.resolve( __dirname, 'recursive-function.png' );
};

