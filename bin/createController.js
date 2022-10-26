const fs = require('fs');
const { exec } = require('child_process');
const { getControllerTemplate, postControllerTemplate, putControllerTemplate } = require('./templates/controllersTemplates')
const { templateDto } = require('./templates/dtoTemplates')
const { addControllers } = require('./utilities/addControllers')
const { addImports } = require('./utilities/addImports')
const { detectPlatform } = require('./utilities/detectPlatform');


const createController = ({ pathUser, singularName }) => {

    const rootPath = detectPlatform(`${pathUser}/src/API/${singularName}`);

    const scriptRootPath = `mkdir ${rootPath}`




    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        const scriptFolders = detectPlatform(`mkdir ${rootPath}/Controllers & mkdir ${rootPath}/DTO`)

        exec(scriptFolders, async (err, stdout, stderr) => {
            if (err) {
                console.log(`ERROR:${err}`)
                return;
            }
            const getController = `${singularName}GetController`
            const postController = `${singularName}PostController`
            const putController = `${singularName}PutController`

            //Create Get controller of entity
            fs.writeFileSync(
                detectPlatform(`${rootPath}/Controllers/${getController}.ts`),
                getControllerTemplate({ singularName })
            );

            //Create Post controller of entity
            fs.writeFileSync(
                detectPlatform(`${rootPath}/Controllers/${postController}.ts`),
                postControllerTemplate({ singularName })
            );

            //Create Put controller of entity
            fs.writeFileSync(
                detectPlatform(`${rootPath}/Controllers/${putController}.ts`),
                putControllerTemplate({ singularName })
            );

            //Create DTO of entity
            fs.writeFileSync(
                detectPlatform(`${rootPath}/DTO/${singularName}Dto.ts`),
                templateDto({ singularName })
            );

            //Update API module with controllers and imports
            const routeApiModule = detectPlatform(`${pathUser}/src/API/ApiModule.ts`)
            let file = fs.readFileSync(routeApiModule, 'utf8')



            addImports({
                file, routeApiModule, importsToAdd: [
                    `import { ${getController} } from './${singularName}/Controllers/${getController}'`,
                    `import { ${postController} } from './${singularName}/Controllers/${postController}'`,
                    `import { ${putController} } from './${singularName}/Controllers/${putController}'`
                ]
            })
            file = fs.readFileSync(routeApiModule, 'utf8')
            addControllers({
                file, routeApiModule, controllersToAdd: [
                    getController,
                    postController,
                    putController
                ]
            });


        })
    });
}

module.exports = createController;