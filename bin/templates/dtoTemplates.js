const templateDto = ({ singularName }) => {
    return `
import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ${singularName}Dto {

    @ApiProperty()
    @IsUUID('4', { message: 'El campo id no es un uuid válido' })
    id: string;

}
`
}

module.exports = { templateDto }