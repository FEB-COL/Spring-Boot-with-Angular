import { IGearDiagQuestion } from 'app/shared/model//gear-diag-question.model';

export interface IGearAmbit {
    id?: number;
    name?: string;
    description?: string;
    gearDiagQuestions?: IGearDiagQuestion[];
    gearDomainName?: string;
    gearDomainId?: number;
}

export class GearAmbit implements IGearAmbit {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public gearDiagQuestions?: IGearDiagQuestion[],
        public gearDomainName?: string,
        public gearDomainId?: number
    ) {}
}
