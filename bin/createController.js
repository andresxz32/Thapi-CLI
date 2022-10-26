const fs = require('fs');
const { exec } = require('child_process');
const { getControllerTemplate, postControllerTemplate, putControllerTemplate } = require('./utilities/templateControllers')
const { templateDto } = require('./utilities/templateDto')

const createController = ({ pathUser, singularName, pluralName }) => {
    const rootPath = `${pathUser}/src/API/${pluralName}`

    const scriptRootPath = `mkdir ${rootPath}`

    //Desde Acá
    const routeApiModule = `${pathUser}/src/API/ApiModule.ts`
    let apiModuleFile = fs.readFileSync(routeApiModule, 'utf8')
    const regex = /controllers\s*:\s*\[(.*?)\s*\]/gs
    const [controllers] = apiModuleFile.match(regex)
    let controllersArray = controllers.replace(/controllers:|\[|\]/g, '').split(',');
    controllersArray = [...controllersArray, 'newController']

    apiModuleFile = apiModuleFile.replace(regex, `controllers: [${controllersArray}]`)

    fs.writeFileSync(routeApiModule, apiModuleFile);
    console.log(controllersArray)

    //Hasta Acá
    return
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
            const getController = `${singularName}GetController`
            const postController = `${singularName}PostController`
            const putController = `${singularName}PutController`

            fs.writeFileSync(`${rootPath}/Controllers/${getController}.ts`,
                getControllerTemplate(singularName)
            );

            fs.writeFileSync(`${rootPath}/Controllers/${postController}.ts`,
                postControllerTemplate(singularName)
            );

            fs.writeFileSync(`${rootPath}/Controllers/${putController}.ts`,
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