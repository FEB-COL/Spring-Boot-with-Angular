export interface IParLicenceType {
    id?: number;
    name?: string;
    description?: string;
}

export class ParLicenceType implements IParLicenceType {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
