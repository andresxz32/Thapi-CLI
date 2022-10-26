const fs = require('fs');

const addImportsAndExports = ({ routeApiModule, singularName, nameModule }) => {
    let file = fs.readFileSync(routeApiModule, 'utf8');
    const singularNameModule = `${singularName}${nameModule}`;

    const regexImports = /imports\s*:\s*\[(.*?)\s*\]/gs;
    const regexExports = /exports\s*:\s*\[(.*?)\s*\]/gs;


    //Imports
    const [imports] = file.match(regexImports);
    let importsArray = imports.replace(/imports:|\[|\]/g, '').split(',');

    importsArray = [...importsArray, singularNameModule]

    importsArray = importsArray.map(importValue => {
        importValue = importValue.match(/(\w)|,|;/gm);
        return importValue ? importValue.join('') : null
    }).filter(i => i !== null);

    file = file.replace(regexImports, `imports: [${importsArray}]`)


    //Exports

    const [exports] = file.match(regexExports);
    let exportsArray = exports.replace(/exports:|\[|\]/g, '').split(',');

    exportsArray = [...exportsArray, singularNameModule]

    exportsArray = exportsArray.map(exportValue => {
        exportValue = exportValue.match(/(\w)|,|;/gm);
        return exportValue ? exportValue.join('') : null
    }).filter(i => i !== null);

    file = file.replace(regexExports, `exports: [${exportsArray}]`)

    //Overwrite File
    fs.writeFileSync(routeApiModule, file);
}

module.exports = addImportsAndExports;