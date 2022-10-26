const fs = require('fs');
const addImports = ({file,routeApiModule,importsToAdd}) =>{
    const regexImports = /^(import[^\S\r\n].+?[^\S\r\n]from[^\S\r\n]*(["']))((?:(?!(?:\.js)?\2)[\S\s])+)(\2\s*;)/gm
    let imports = file.match(regexImports)

    importsToAdd.forEach(importRoute => {
        imports = [...imports, importRoute]
    });
    file = file.replace(regexImports,'').replace('',imports.join('\n'));
    fs.writeFileSync(routeApiModule, file);
}


module.exports = { addImports};

