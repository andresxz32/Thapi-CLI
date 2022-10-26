const fs = require('fs');
const { exec } = require('child_process');
const detectPlatform = require('./utilities/detectPlatform');
const { templateEntity, templateCreator, templateUpdater, templateSearcher, templateModule } = require('./templates/domainTemplates')
const addImports = require('./utilities/addImports');
const addImportsAndExports = require('./utilities/addImportsAndExports');
const createDomain = ({ pathUser, singularName }) => {
    const rootPath = detectPlatform(`${pathUser}/src/Domain/${singularName}`);
    const scriptRootPath = `mkdir ${rootPath}`

    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }

        //Create Entity Class
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}.ts`),
            templateEntity({ singularName })
        );

        //Create Creator
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Creator.ts`),
            templateCreator({ singularName })
        );

        //Create Searcher
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Searcher.ts`),
            templateSearcher({ singularName })
        );

        //Create Updater
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Updater.ts`),
            templateUpdater({ singularName })
        );

        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Module.ts`),
            templateModule({ singularName })
        );

        //Update API module with controllers and imports
        const routeApiModule = detectPlatform(`${pathUser}/src/Domain/DomainModule.ts`)
        let file = fs.readFileSync(routeApiModule, 'utf8')

        addImports({
            file, routeApiModule, importsToAdd: [
                `import { ${singularName}Module } from './${singularName}/${singularName}Module';`
            ]
        })

        addImportsAndExports({ routeApiModule, singularName, nameModule: "Module" })
    });
}

module.exports = createDomain;