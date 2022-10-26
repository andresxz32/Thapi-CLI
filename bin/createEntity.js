const process = require('process');
const pluralize = require('pluralize')
const { titleCase } = require('./utilities/titlecase');

const { createController } = require('./createController')
const { createDomain } = require('./createDomain')

const createEntity = ({ name }) => {
    name = titleCase(name);
    // const pluralName = pluralize.plural(name);
    const singularName = pluralize.singular(name);

    console.log('\nCreating Entity:', singularName)

    if (!name || name === true) {
        console.log('ERROR: You must provide a name for the app.')
        return
    }

    const pathUser = process.cwd();
    createController({ pathUser, singularName })
    createDomain({ pathUser, singularName })
}

module.exports = { createEntity };