const { exec } = require('child_process');
const process = require('process');
const detectPlatform = require('./utilities/detectPlatform');


const createApp = ({ name }) => {
    console.log('Creating App:', name)
    if (!name || name === true) {
        console.log('ERROR: You must provide a name for the app.')
        return
    }
    const pathUser = process.cwd();
    const script = `cd ${pathUser} & git clone -b main https://github.com/andresxz32/skeleton-nestjs-architecture.git ${name}`;
    console.log('\n\nExecuting Command')
    exec(script, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        console.log('\n Navigate to the project folder and run:')
        console.log('\n Development: docker-compose up dev')
        console.log('\n Production: docker-compose up prod')
    });
    return;
}




module.exports = { createApp };