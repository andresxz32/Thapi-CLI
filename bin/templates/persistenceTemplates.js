const templateEntity = ({ singularName, pluralName }) => {
    return `
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { Document } from 'mongoose';
    export type ${singularName}Document = ${singularName} & Document;

    @Schema({
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc: ${singularName}, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        },
        collection: "${pluralName}"
    })
    export class ${singularName} {
        @Prop({ type: String })
        _id: string
    
    }
    
    export const ${singularName}Schema = SchemaFactory.createForClass(${singularName});
`
}


const templateProvider = ({ singularName }) => {
    return `
import { Provider } from "@nestjs/common";
import { ${singularName}Repository } from "./${singularName}Repository";

export const ${singularName}Provider: Provider = {
    provide: '${singularName}Repository',
    useClass: ${singularName}Repository
}
`
}


const templateRepository = ({ singularName }) => {
    const lowerSingularName = singularName.toLowerCase();
    return `
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { I${singularName}Repository } from './I${singularName}Repository';
    import { ${singularName}Document } from './${singularName}Entity';
    import { ${singularName} } from 'src/Domain/${singularName}/${singularName}';
    
    
    @Injectable()
    export class ${singularName}Repository implements I${singularName}Repository {

        constructor(@InjectModel('${singularName}') private readonly _${lowerSingularName}Model: Model<${singularName}Document>) { }
    
        private async persist(id: string, ${lowerSingularName}: ${singularName}): Promise<void> {
            const document = { ...${lowerSingularName}, _id: id, id: undefined };
            await this._${lowerSingularName}Model.updateOne({ _id: id }, { $set: document }, { upsert: true });
        }
    
    }
`
}

const templateIRepository = ({ singularName }) => {
    return `
import { ${singularName} } from "src/Domain/${singularName}/${singularName}"
export interface I${singularName}Repository {
    //Add use cases here
}
`
}

const templateModule = ({ singularName }) => {
    return `
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${singularName}Schema } from './${singularName}Entity';
import { ${singularName}Provider } from './${singularName}Provider';
    
    
@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: '${singularName}', schema: ${singularName}Schema }
            ]
        )
    ],
    providers: [${singularName}Provider],
    exports: [${singularName}Provider],
})
export class ${singularName}RepositoryModule { }
`
}


module.exports = { templateEntity, templateProvider, templateRepository, templateIRepository, templateModule }