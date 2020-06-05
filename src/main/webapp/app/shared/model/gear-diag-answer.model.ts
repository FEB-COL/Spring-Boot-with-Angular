import { Moment } from 'moment';

export interface IGearDiagAnswer {
    id?: number;
    answer?: number;
    creationDate?: Moment;
    comment?: string;
    gearDiagquestionId?: number;
}

export class GearDiagAnswer implements IGearDiagAnswer {
    constructor(
        public id?: number,
        public answer?: number,
        public creationDate?: Moment,
        public comment?: string,
        public gearDiagquestionId?: number
    ) {}
}
