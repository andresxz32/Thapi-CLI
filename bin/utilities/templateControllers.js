const getControllerTemplate = ({singularName}) => {
    return `
import { Controller, Get, Param } from '@nestjs/common';


@Controller("${singularName.toLowerCase()}")
export class ${singularName}GetController {
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

const postControllerTemplate = ({singularName}) => {
    return `
import { Controller, Post, Body } from '@nestjs/common';
import { ${singularName}Dto } from '../DTO/${singularName}Dto';

@Controller("${singularName.toLowerCase()}")
export class ${singularName}PostController {
    constructor(
    ) { }


    @Post('')
    async create(
        @Body() ${singularName.toLowerCase()}: ${singularName}Dto,
    ) {
        return 'Ok'
    }
}`
}


const putControllerTemplate = ({singularName}) => {
    return `
import { Controller, Put, Body } from '@nestjs/common';
import { AdmissionDto } from '../DTO/AdmissionDto';

@Controller("${singularName.toLowerCase()}")
export class ${singularName}PutController {
    constructor(
    ) { }


    @Put('')
    async update(
        @Body() ${singularName.toLowerCase()}: ${singularName}Dto,
    ) {
        return 'Ok'
    }
}`
}

module.exports = { getControllerTemplate, postControllerTemplate, putControllerTemplate }