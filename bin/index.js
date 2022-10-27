#! /usr/bin/env node
console.log('\nThapi CLI for create aplications of Nestjs with hexagonal architecture');
console.log('\nProvided by Andrés Ospina for Trobbit Inc.')
console.log('\n\n https://github.com/andresxz32/Thapi-CLI')
const yargs = require("yargs");
const { createApp } = require("./createApp");
const { createEntity } = require("./createEntity");

const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

//Help lines
const usage = "\nUsage: \n thapi <new> <app_name> ";

yargs.usage(usage)
    .option("l", {
        alias: "--new",
        describe: "Create Nestjs project with hexagonal architecture",
        type: "boolean",
        demandOption: false
    })
    .options("l", {
        alias: "--entity",
        describe: "Create Entity",
        type: "boolean",
        demandOption: false
    })
    .help(true)
    .argv;

const command = {
    new: () => createApp({ name: argv.name }),
    entity: () => createEntity({ name: argv.name })
}

Object.keys(argv).forEach((key) => {
    if (command[key]) {
        command[key].call();
    }

})


