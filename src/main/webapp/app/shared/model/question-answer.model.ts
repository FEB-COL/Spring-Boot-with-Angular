import { Moment } from 'moment';
import { IGearDiagAnswer } from 'app/shared/model//gear-diag-answer.model';
import { IGearDiagQuestion } from 'app/shared/model//gear-diag-question.model';

export interface IQuestionAnswer {
    idDiagnostic?: number;
    idQuestion?: number;
    idAnswer?: number;
    nameQuestion?: string;
    valueAnswer?: number;
    comment?: string;
}

export class QuestionAnswer implements IQuestionAnswer {
    constructor(
        public idDiagnostic?: number,
        public idQuestion?: number,
        public idAnswer?: number,
        public nameQuestion?: string,
        public valueAnswer?: number,
        public comment?: string
    ) {}
}
