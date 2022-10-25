const process = require('process');
const pluralize = require('pluralize')
const { titleCase } = require('./utilities/titlecase');

const {createController } = require('./createController')


const createEntity = ({ name }) => {
    name = titleCase(name);
    const pluralName = pluralize.plural(name);
    const singularName = pluralize.singular(name);

    console.log('\nCreating Entity:', pluralName)

    if (!name || name === true) {
        console.log('ERROR: You must provide a name for the app.')
        return
    }

    const pathUser = process.cwd();
    createController({ pathUser, singularName, pluralName })
    createDomain({ pathUser, singularName, pluralName })
}

module.exports = { createEntity };