import { Moment } from 'moment';

export interface IGearSystemsFunctionality {
    id?: number;
    name?: string;
    description?: string;
    creationDate?: Moment;
    modifyDate?: Moment;
    gearinformationsystemsId?: number;
    gearInformationSystemName?: string;
}

export class GearSystemsFunctionality implements IGearSystemsFunctionality {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public creationDate?: Moment,
        public modifyDate?: Moment,
        public gearinformationsystemsId?: number,
        public gearInformationSystemName?: string
    ) {}
}
