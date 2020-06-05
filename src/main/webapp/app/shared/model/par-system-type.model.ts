// Interface Mapea los campos de la tabla
export interface IParSystemType {
    id?: number;
    name?: string;
    description?: string;
}

export class ParSystemType implements IParSystemType {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
