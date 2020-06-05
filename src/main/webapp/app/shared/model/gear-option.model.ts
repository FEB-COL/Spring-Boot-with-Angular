export interface IGearOption {
    id?: number;
    name?: string;
    description?: string;
    geardecisionId?: number;
    geardecisionName?: string;
}

export class GearOption implements IGearOption {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public geardecisionId?: number,
        public geardecisionName?: string
    ) {}
}
