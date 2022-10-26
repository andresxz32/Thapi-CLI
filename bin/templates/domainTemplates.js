const templateEntity = ({ singularName }) => {
    return `
import { Uuid } from "src/Shared/Utilities/value-object/Uuid";


export class ${singularName} {
    readonly id: Uuid;

    constructor(
        {
            id,
        }: {
            id: Uuid
        }) {
        this.id = id;
    }
}
`

}

const templateCreator = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase();
    return `
    import { ${singularName} } from 'src/Domain/${singularName}/${singularName}';
    import { Inject, Injectable } from "@nestjs/common";
    import { I${singularName}Repository } from 'src/Persistence/${singularName}/I${singularName}Repository';
    import { Uuid } from 'src/Shared/Utilities/value-object/Uuid';
    import { ${singularName}CreatorRequest } from 'src/Shared/Requests/${singularName}CreatorRequest';
    
    const ${singularName}Repo = () => Inject('${singularName}Repository');
    
    @Injectable()
    export class ${singularName}Creator {
        constructor
            (
                @${singularName}Repo() private readonly _${lowerSingularName}Repository: I${singularName}Repository,
        ) {
        }
        async create(request: ${singularName}CreatorRequest) {
            const ${lowerSingularName} = new ${singularName}({
                id: new Uuid(request.id),
            })
            await this._${lowerSingularName}Repository.save(${lowerSingularName})
        }
    
    }
`
}

const templateSearcher = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase();
    return `
import { Inject, Injectable } from "@nestjs/common";
import { I${singularName}Repository } from "src/Persistence/${singularName}/I${singularName}Repository";

const ${singularName}Repo = () => Inject('${singularName}Repository');

@Injectable()
export class ${singularName}Searcher {
    constructor
        (
            @${singularName}Repo() private readonly _${lowerSingularName}Repository: I${singularName}Repository
        ) {
    }

    async searchById(id: string) {
        return await this._${lowerSingularName}Repository.searchById(id);
    }

}
    `
}

const templateUpdater = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase();
    return `
    import { I${singularName}Repository } from 'src/Persistence/${singularName}/I${singularName}Repository';
    import { Inject, Injectable } from "@nestjs/common";
    import { ${singularName} } from './${singularName}';
    import { Uuid } from 'src/Shared/Utilities/value-object/Uuid';
    import { ${singularName}CreatorRequest } from 'src/Shared/Request/${singularName}CreatorRequest';
    
    
    
    const ${singularName}Repo = () => Inject('${singularName}Repository');
    
    @Injectable()
    export class ${singularName}Updater {
        constructor
            (
                @${singularName}Repo() private readonly _${lowerSingularName}Repository: I${singularName}Repository,
        ) {
        }
    
        async update(request: ${singularName}CreatorRequest) {
            const ${lowerSingularName} = new ${singularName}({
                id: new Uuid(request.id)
            })
            await this._${lowerSingularName}Repository.save(${lowerSingularName});
        }
}
    `
}


const templateModule = ({ singularName }) => {
    return `
import { Module } from '@nestjs/common';
import { ${singularName}RepositoryModule } from 'src/Persistence/${singularName}/${singularName}RepositoryModule';
import { ${singularName}Creator } from './${singularName}Creator';
import { ${singularName}Searcher } from './${singularName}Searcher';
import { ${singularName}Updater } from './${singularName}Updater';

@Module({
    imports: [
        ${singularName}RepositoryModule
    ],
    providers: [${singularName}Creator, ${singularName}Searcher, ${singularName}Updater],
    exports: [${singularName}Creator, ${singularName}Searcher, ${singularName}Updater],
})
export class ${singularName}Module { }
    `
}

const templateRequest = ({ singularName }) => {
    return `
    export interface ${singularName}CreatorRequest {
        id: string;
    };
    `
}


module.exports = { templateEntity, templateUpdater, templateSearcher, templateCreator, templateModule, templateRequest }