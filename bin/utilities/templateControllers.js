const getControllerTemplate = (name) => {
    return `
import { Controller, Get, Param } from '@nestjs/common';


@Controller("${name.toLowerCase()}")
export class ${name}GetController {
    constructor(
    ) { }


    @Get(':id')
    async find(
        @Param('id') id: string,
    ) {
        return 'Ok'
    }
}`
}

const postControllerTemplate = (name) => {
    return `
import { Controller, Post, Body } from '@nestjs/common';
import { ${name}Dto } from './DTO/${name}Dto';

@Controller("${name.toLowerCase()}")
export class ${name}PostController {
    constructor(
    ) { }


    @Post('')
    async create(
        @Body() ${name.toLowerCase()}: ${name}Dto,
    ) {
        return 'Ok'
    }
}`
}


const putControllerTemplate = (name) => {
    return `
import { Controller, Put, Body } from '@nestjs/common';
import { AdmissionDto } from './DTO/AdmissionDto';

@Controller("${name.toLowerCase()}")
export class ${name}PutController {
    constructor(
    ) { }


    @Put('')
    async update(
        @Body() ${name.toLowerCase()}: ${name}Dto,
    ) {
        return 'Ok'
    }
}`
}

module.exports = { getControllerTemplate, postControllerTemplate, putControllerTemplate }