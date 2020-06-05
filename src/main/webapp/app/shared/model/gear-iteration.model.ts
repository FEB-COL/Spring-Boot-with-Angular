import { Moment } from 'moment';
import { IGearProject } from 'app/shared/model//gear-project.model';

export interface IGearIteration {
    id?: number;
    name?: string;
    description?: string;
    startDate?: Moment;
    endDate?: Moment;
    createdBy?: string;
    creationDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    gearProjects?: IGearProject[];
}

export class GearIteration implements IGearIteration {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public createdBy?: string,
        public creationDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public gearProjects?: IGearProject[]
    ) {}
}
