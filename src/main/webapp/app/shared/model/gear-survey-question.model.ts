import { IGearSurveyAnswer } from 'app/shared/model//gear-survey-answer.model';

export interface IGearSurveyQuestion {
    id?: number;
    text?: string;
    description?: string;
    correctAnswer?: number;
    gearsurveyanswers?: IGearSurveyAnswer[];
    gearsurveyId?: number;
    gearsurveyquestiontypeId?: number;
}

export class GearSurveyQuestion implements IGearSurveyQuestion {
    constructor(
        public id?: number,
        public text?: string,
        public description?: string,
        public correctAnswer?: number,
        public gearsurveyanswers?: IGearSurveyAnswer[],
        public gearsurveyId?: number,
        public gearsurveyquestiontypeId?: number
    ) {}
}
