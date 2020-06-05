import { Moment } from 'moment';

export interface IGearRiskLog {
    id?: number;
    log?: string;
    date?: Moment;
    createdBy?: string;
    creationDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    gearProjectRiskId?: number;
}

export class GearRiskLog implements IGearRiskLog {
    constructor(
        public id?: number,
        public log?: string,
        public date?: Moment,
        public createdBy?: string,
        public creationDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public gearProjectRiskId?: number
    ) {}
}
