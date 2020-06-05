import { Moment } from 'moment';
import { IGearDiagQuestion } from 'app/shared/model//gear-diag-question.model';

export interface IGearDiagnosis {
    id?: number;
    name?: string;
    description?: string;
    creationDate?: Moment;
    levelMaturity?: number;
    gearDiagQuestions?: IGearDiagQuestion[];
    gearDiagnosisTypeId?: number;
    gearDomainName?: string;
    gearDomainId?: number;
}

export class GearDiagnosis implements IGearDiagnosis {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public creationDate?: Moment,
        public levelMaturity?: number,
        public gearDiagQuestions?: IGearDiagQuestion[],
        public gearDiagnosisTypeId?: number,
        public gearDomainName?: string,
        public gearDomainId?: number
    ) {}
}
