import { Moment } from 'moment';
import { IGearProject } from 'app/shared/model//gear-project.model';

export interface IGearPortfolio {
    id?: number;
    name?: string;
    description?: string;
    startDate?: Moment;
    createdBy?: string;
    creationDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    gearProjects?: IGearProject[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
}

export class GearPortfolio implements IGearPortfolio {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public startDate?: Moment,
        public createdBy?: string,
        public creationDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public gearProjects?: IGearProject[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number
    ) {}
}
