const fs = require('fs');
const { exec } = require('child_process');
const { detectPlatform } = require('./utilities/detectPlatform');


const createDomain = ({ pathUser, singularName }) => {
    const rootPath = detectPlatform(`${pathUser}/src/Domain/${singularName}`);
    const scriptRootPath = `mkdir ${rootPath}`

    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
    });
}

module.exports = createDomain ;