export interface IGearSurveyAnswer {
    id?: number;
    text?: string;
    isCorrect?: boolean;
    gearsurveyquestionId?: number;
}

export class GearSurveyAnswer implements IGearSurveyAnswer {
    constructor(public id?: number, public text?: string, public isCorrect?: boolean, public gearsurveyquestionId?: number) {
        this.isCorrect = this.isCorrect || false;
    }
}
