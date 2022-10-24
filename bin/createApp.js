const { exec } = require('child_process');
const process = require('process');
const createApp = ({ name }) => {
    console.log('creating App:', name)
    if (!name || name === true) {
        console.log('ERROR: You must provide a name for the app.')
        return
    }
    const pathUser = process.cwd();
    const script = `cd ${pathUser} & git clone -b main https://github.com/andresxz32/skeleton-nestjs-architecture.git ${name} & cd ${name}`;
    console.log('Executing Command')
    exec(script, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        console.log('Command executed successfully :)')
    });
}




module.exports = { createApp };