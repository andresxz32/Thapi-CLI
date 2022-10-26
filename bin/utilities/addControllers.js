const fs = require('fs');
const addControllers = ({ routeApiModule, file, controllersToAdd }) => {
    const regexControllers = /controllers\s*:\s*\[(.*?)\s*\]/gs;

    const [controllers] = file.match(regexControllers)
    let controllersArray = controllers.replace(/controllers:|\[|\]/g, '').split(',');

    controllersToAdd.forEach(controller => {
        controllersArray = [...controllersArray, controller]
    })
    controllersArray = controllersArray.map(controller => {
        controller = controller.match(/(\w)|,|;/gm);
        return controller ? controller.join('') : null
    }).filter(i => i !== null);
    file = file.replace(regexControllers, `controllers: [${controllersArray}]`)
    fs.writeFileSync(routeApiModule, file);
}

module.exports = { addControllers }