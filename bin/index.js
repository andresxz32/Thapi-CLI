#! /usr/bin/env node
console.log('\nThapi CLI for create aplications of Nestjs with hexagonal architecture');
console.log('\nProvided by Andrés Ospina for Trobbit Inc.')
const yargs = require("yargs");
const { createApp } = require("./createApp");
const { createEntity } = require("./createEntity");



//Help lines
const usage = "\nUsage: \n thapi <new> <app_name> ";
const options = yargs
    .usage(usage)
    .option("l", {
        alias: "--new",
        describe: "Create Nestjs project with hexagonal architecture",
        type: "boolean",
        demandOption: false
    })
    .help(true)
    .argv;

const command = {
    new: createApp({ name: options.name }),
    entity: createEntity({ name: options.name })
}

Object.keys(options).forEach((key) => {
    command[key];
})
