const fs = require('fs');
const { exec } = require('child_process');
const detectPlatform = require('./utilities/detectPlatform');
const { templateEntity, templateProvider, templateRepository, templateIRepository, templateModule } = require('./templates/persistenceTemplates');
const addModulesInPersistenceModule = require('./utilities/addModulesInPersistenceModule');
const addImportsAndExports = require('./utilities/addImportsAndExports');
const createPersistence = ({ pathUser, singularName, pluralName }) => {
    const rootPath = detectPlatform(`${pathUser}/src/Persistence/${singularName}`);

    const scriptRootPath = `mkdir ${rootPath}`




    exec(scriptRootPath, (err, stdout, stderr) => {
        if (err) {
            console.log(`ERROR:${err}`)
            return;
        }
        //Create Entity
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Entity.ts`),
            templateEntity({ singularName, pluralName })
        );

        //Create Provider
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Provider.ts`),
            templateProvider({ singularName })
        );

        //Create Repository
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}Repository.ts`),
            templateRepository({ singularName })
        );

        //Create Interface Repository
        fs.writeFileSync(
            detectPlatform(`${rootPath}/I${singularName}Repository.ts`),
            templateIRepository({ singularName })
        );

        //Create Repository Module
        fs.writeFileSync(
            detectPlatform(`${rootPath}/${singularName}RepositoryModule.ts`),
            templateModule({ singularName })
        );

        const routeApiModule = detectPlatform(`${pathUser}/src/Persistence/PersistenceModule.ts`);
        addModulesInPersistenceModule({
            routeApiModule, singularName
        })
        addImportsAndExports({ routeApiModule, singularName, nameModule: "RepositoryModule" })
    });
}

module.exports = createPersistence 