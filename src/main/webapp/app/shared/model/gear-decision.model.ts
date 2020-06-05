import { IGearOption } from 'app/shared/model//gear-option.model';
import { IGearCriteria } from 'app/shared/model//gear-criteria.model';

export interface IGearDecision {
    id?: number;
    name?: string;
    goal?: string;
    gearoptions?: IGearOption[];
    gearcriteria?: IGearCriteria[];
    geardomainId?: number;
    geardomainName?: string;
}

export class GearDecision implements IGearDecision {
    constructor(
        public id?: number,
        public name?: string,
        public goal?: string,
        public gearoptions?: IGearOption[],
        public gearcriteria?: IGearCriteria[],
        public geardomainId?: number,
        public geardomainName?: string
    ) {}
}
