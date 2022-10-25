const fs = require('fs');
const { exec } = require('child_process');
const { getControllerTemplate, postControllerTemplate, putControllerTemplate } = require('./utilities/templateControllers')
const { templateDto } = require('./utilities/templateDto')

const createController = ({ pathUser, singularName, pluralName }) => { 
    const rootPath = `${pathUser}/src/API/${pluralName}`

    const scriptRootPath = `mkdir ${rootPath}`


    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        const scriptFolders = `mkdir ${rootPath}/Controllers & mkdir ${rootPath}/DTO`

        exec(scriptFolders, (err, stdout, stderr) => {
            if (err) {
                console.log(`ERROR:${err}`)
                return;
            }

            fs.writeFileSync(`${rootPath}/Controllers/${singularName}GetController.ts`,
                getControllerTemplate(singularName)
            );

            fs.writeFileSync(`${rootPath}/Controllers/${singularName}PostController.ts`,
                postControllerTemplate(singularName)
            );

            fs.writeFileSync(`${rootPath}/Controllers/${singularName}PutController.ts`,
                putControllerTemplate(singularName)
            );

            fs.writeFileSync(`${rootPath}/DTO/${singularName}Dto.ts`,
                templateDto(singularName)
            );


            //TODO: Create Files .ts* in Controllers, DTO and update Module.ts
        })
    });
}

module.exports = { createController };