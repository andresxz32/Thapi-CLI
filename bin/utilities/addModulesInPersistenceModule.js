const fs = require('fs');


const addModulesInPersistenceModule = ({ routeApiModule, singularName }) => {
    const importModule = `import { ${singularName}RepositoryModule } from './${singularName}/${singularName}RepositoryModule';`
    let file = fs.readFileSync(routeApiModule, 'utf8');

    const regexImports = /^(import[^\S\r\n].+?[^\S\r\n]from[^\S\r\n]*(["']))((?:(?!(?:\.js)?\2)[\S\s])+)(\2\s*;)/gm

    let imports = file.match(regexImports)

    imports = [...imports, importModule]

    file = file.replace(regexImports, '').replace('', imports.join('\n'));
    fs.writeFileSync(routeApiModule, file);
}







module.exports = addModulesInPersistenceModule;