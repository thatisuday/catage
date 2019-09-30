const fs = require( 'fs' );
const child_process = require( 'child_process' );
const chai = require( 'chai' );
const fileType = require( 'file-type' );
const isSvg = require( 'is-svg' );

// test jobs
const JOBS = {
    RUN_API_IMAGE_PNG: require( './api-file-png.job.js' ),
    RUN_API_BUFFER_SVG: require( './api-buffer-svg.job.js' ),
    RUN_CLI_FILE_PNG: require( './cli-file-png.job.js' ),
    RUN_CLI_FILE_JPEG: require( './cli-file-jpeg.job.js' ),
};

// all mocha tests
describe( 'TESTS:', function() {

    // allow 5s timeout
    this.timeout( 5000 );
    
    // clean image files before running tests
    before( () => {
        child_process.execSync( 'rm -rf *.png *.svg *.jpg', { cwd: __dirname, stdio: 'inherit' } );
    } );

    // perform API tests
    describe( 'API:', () => {
        
        // image API test: PNG
        it( 'should create image file with `image/png` MIME type', async () => {
            const imagePath = await JOBS.RUN_API_IMAGE_PNG();
            const type = fileType( fs.readFileSync( imagePath ) );

            // expect mime type of the image file to be PNG
            chai.expect( type.mime ).to.be.equal( 'image/png' );
        } );

        // buffer API test: SVG
        it( 'should return SVG buffer (text/string)', async () => {
            const imageBuffer = await JOBS.RUN_API_BUFFER_SVG();
            
            // expect `imageBuffer` to be a SVG (text/string)
            chai.expect( isSvg( imageBuffer ) ).to.be.equal( true );
        } );
    } );

    // perform CLI tests
    describe( 'CLI:', () => {
        
        // image CLI test: PNG
        it( 'should create image file with `image/png` MIME type', async () => {
            const imagePath = await JOBS.RUN_CLI_FILE_PNG();
            const type = fileType( fs.readFileSync( imagePath ) );

            // expect mime type of the image file to be PNG
            chai.expect( type.mime ).to.be.equal( 'image/png' );
        } );

        // image CLI test: JPEG
        it( 'should create image file with `image/jpeg` MIME type', async () => {
            const imagePath = await JOBS.RUN_CLI_FILE_JPEG();
            const type = fileType( fs.readFileSync( imagePath ) );

            // expect mime type of the image file to be JPEG
            chai.expect( type.mime ).to.be.equal( 'image/jpeg' );
        } );
        
    } );

    
} );