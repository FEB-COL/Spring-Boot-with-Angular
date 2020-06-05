import { Moment } from 'moment';
import { IGearSurveyQuestion } from 'app/shared/model//gear-survey-question.model';
import { IGearSurveySolve } from 'app/shared/model//gear-survey-solve.model';

export interface IGearSurvey {
    id?: number;
    name?: string;
    start?: Moment;
    end?: Moment;
    description?: string;
    gearsurveyquestions?: IGearSurveyQuestion[];
    gearsurveysolves?: IGearSurveySolve[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
}

export class GearSurvey implements IGearSurvey {
    constructor(
        public id?: number,
        public name?: string,
        public start?: Moment,
        public end?: Moment,
        public description?: string,
        public gearsurveyquestions?: IGearSurveyQuestion[],
        public gearsurveysolves?: IGearSurveySolve[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number
    ) {}
}
