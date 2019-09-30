const fs = require( 'fs' );
const child_process = require( 'child_process' );
const chai = require( 'chai' );
const fileType = require( 'file-type' );
const isSvg = require( 'is-svg' );

// test jobs
const JOBS = {
    RUN_API_IMAGE_PNG: require( './api-file-png.job.js' ),
    RUN_API_BUFFER_PNG: require( './api-buffer-jpeg.job.js' ),
    RUN_CLI_FILE_PNG: require( './cli-file-png.job.js' ),
    RUN_CLI_FILE_SVG: require( './cli-file-svg.job.js' ),
};

// all mocha tests
describe( 'TESTS:', function() {

    // allow 5s timeout
    this.timeout( 5000 );
    
    // clean image file before running tests
    before( () => {
        child_process.execSync( 'rm -rf *.png *.svg *.jpg', { cwd: __dirname, stdio: 'inherit' } );
    } );

    // perform local API tests
    describe( 'API:', () => {
        
        // image API test
        it( 'should create image file with `image/png` MIME type', async () => {
            const imagePath = await JOBS.RUN_API_IMAGE_PNG();
            const type = fileType( fs.readFileSync( imagePath ) );

            // expect mime type of the image file to be PNG
            chai.expect( type.mime ).to.be.equal( 'image/png' );
        } );

        // buffer API test
        it( 'should return JPEG buffer with `image/jpeg` MIME type', async () => {
            const imageBuffer = await JOBS.RUN_API_BUFFER_PNG();
            const type = fileType( imageBuffer );

            // expect mime type of the image buffer to be JPEG
            chai.expect( type.mime ).to.be.equal( 'image/jpeg' );
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

        // image CLI test: SVG
        it( 'should create image file with `image/svg` MIME type', async () => {
            const imagePath = await JOBS.RUN_CLI_FILE_SVG();

            // expect mime type of the image file to be SVG
            chai.expect( isSvg( fs.readFileSync( imagePath, { encoding: 'utf-8' } ) ) ).to.be.equal( true );
        } );
        
    } );

    
} );