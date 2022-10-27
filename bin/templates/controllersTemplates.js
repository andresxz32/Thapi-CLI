const getControllerTemplate = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase()
    return `
import { Controller, Get, Param } from '@nestjs/common';
import { ${singularName}Searcher } from 'src/Domain/${singularName}/${singularName}Searcher';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('${singularName}')
@Controller("${lowerSingularName}")
export class ${singularName}GetController {
    constructor(
        private readonly _${lowerSingularName}Searcher: ${singularName}Searcher,
    ) { }


    @Get(':id')
    async find(
        @Param('id') id: string,
    ) {
        return await this._${lowerSingularName}Searcher.searchById(id);
    }
}`
}

const postControllerTemplate = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase()
    return `
import { Controller, Post, Body } from '@nestjs/common';
import { ${singularName}Dto } from '../DTO/${singularName}Dto';
import { ${singularName}Creator } from 'src/Domain/${singularName}/${singularName}Creator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('${singularName}')
@Controller("${lowerSingularName}")
export class ${singularName}PostController {
    constructor(
        private readonly _${lowerSingularName}Creator: ${singularName}Creator,
    ) { }


    @Post('')
    async create(
        @Body() ${lowerSingularName}: ${singularName}Dto,
    ) {
        await this._${lowerSingularName}Creator.create(${lowerSingularName});
    }
}`
}


const putControllerTemplate = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase()
    return `
import { Controller, Put, Body } from '@nestjs/common';
import { ${singularName}Dto } from '../DTO/${singularName}Dto';
import { ApiTags } from '@nestjs/swagger';
import { ${singularName}Updater } from 'src/Domain/${singularName}/${singularName}Updater';

@ApiTags('${singularName}')
@Controller("${lowerSingularName}")
export class ${singularName}PutController {
    constructor(
        private readonly _${lowerSingularName}Updater: ${singularName}Updater,
    ) { }


    @Put('')
    async update(
        @Body() ${lowerSingularName}: ${singularName}Dto,
    ) {
        await this._${lowerSingularName}Updater.update(${lowerSingularName});
    }
}`
}


module.exports = { getControllerTemplate, postControllerTemplate, putControllerTemplate }