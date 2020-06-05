import { Moment } from 'moment';
import { IGearDiagAnswer } from 'app/shared/model//gear-diag-answer.model';

export interface IGearDiagQuestion {
    id?: number;
    name?: string;
    description?: string;
    creationDate?: Moment;
    gearDiagAnswers?: IGearDiagAnswer[];
    gearDiagnosisId?: number;
    gearDiagnosisName?: string;
    gearAmbitId?: number;
    gearAmbitName?: string;
}

export class GearDiagQuestion implements IGearDiagQuestion {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public creationDate?: Moment,
        public gearDiagAnswers?: IGearDiagAnswer[],
        public gearDiagnosisId?: number,
        public gearDiagnosisName?: string,
        public gearAmbitId?: number,
        public gearAmbitName?: string
    ) {}
}
