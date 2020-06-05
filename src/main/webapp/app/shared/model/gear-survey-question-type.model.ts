import { IGearSurveyQuestion } from 'app/shared/model//gear-survey-question.model';

export interface IGearSurveyQuestionType {
    id?: number;
    name?: string;
    description?: string;
    gearsurveyquestions?: IGearSurveyQuestion[];
}

export class GearSurveyQuestionType implements IGearSurveyQuestionType {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public gearsurveyquestions?: IGearSurveyQuestion[]
    ) {}
}
