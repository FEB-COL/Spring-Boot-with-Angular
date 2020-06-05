import { IGearInformationSystems } from 'app/shared/model//gear-information-systems.model';

export interface IParCoinType {
    id?: number;
    name?: string;
    description?: string;
    symbol?: string;
    gearInformationSystems?: IGearInformationSystems[];
}

export class ParCoinType implements IParCoinType {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public symbol?: string,
        public gearInformationSystems?: IGearInformationSystems[]
    ) {}
}
