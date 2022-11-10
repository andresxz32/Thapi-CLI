const fs = require('fs');
const { exec } = require('child_process');
const detectPlatform = require('./utilities/detectPlatform');
const { getControllerTestTemplate, postControllerTestTemplate, putControllerTestTemplate } = require('./templates/controllersTestTemplates')

const createTests = ({ pathUser, singularName }) => {
    const rootPath = detectPlatform(`${pathUser}/test/Integration/Tests/${singularName}`);
    const scriptRootPath = `mkdir ${rootPath}`

    const getController = `${singularName}GetController`
    const postController = `${singularName}PostController`
    const putController = `${singularName}PutController`

    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        //Create Get controller Tests of entity
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${getController}.e2e-spec.ts`),
            getControllerTestTemplate({ singularName })
        );

        //Create Post controller Tests of entity
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${postController}.e2e-spec.ts`),
            postControllerTestTemplate({ singularName })
        );

        //Create Put controller Tests of entity
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${putController}.e2e-spec.ts`),
            putControllerTestTemplate({ singularName })
        );

    });


}

module.exports = createTests;