export interface IGearSurveySolve {
    id?: number;
    text?: string;
    gearsurveyId?: number;
    gearsurveyquestionId?: number;
    gearsurveyanswerId?: number;
    gearUserName?: string;
    gearUserId?: number;
}

export class GearSurveySolve implements IGearSurveySolve {
    constructor(
        public id?: number,
        public text?: string,
        public gearsurveyId?: number,
        public gearsurveyquestionId?: number,
        public gearsurveyanswerId?: number,
        public gearUserName?: string,
        public gearUserId?: number
    ) {}
}
