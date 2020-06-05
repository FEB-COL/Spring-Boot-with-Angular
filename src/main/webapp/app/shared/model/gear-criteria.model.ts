export interface IGearCriteria {
    id?: number;
    name?: string;
    description?: string;
    geardecisionId?: number;
    geardecisionName?: string;
}

export class GearCriteria implements IGearCriteria {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public geardecisionId?: number,
        public geardecisionName?: string
    ) {}
}
