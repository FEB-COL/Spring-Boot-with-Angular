import { Moment } from 'moment';
import { IGearProjectRisk } from 'app/shared/model//gear-project-risk.model';
import { IGearIteration } from 'app/shared/model//gear-iteration.model';

export interface IGearProject {
    id?: number;
    name?: string;
    description?: string;
    budget?: number;
    percentageCompleted?: number;
    spend?: number;
    startDate?: Moment;
    endDate?: Moment;
    attach?: string;
    createdBy?: string;
    creationDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    gearProjectRisks?: IGearProjectRisk[];
    gearIterations?: IGearIteration[];
    gearPortfolioId?: number;
    gearPortfolioName?: string;
}

export class GearProject implements IGearProject {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public budget?: number,
        public percentageCompleted?: number,
        public spend?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public attach?: string,
        public createdBy?: string,
        public creationDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public gearProjectRisks?: IGearProjectRisk[],
        public gearIterations?: IGearIteration[],
        public gearPortfolioId?: number,
        public gearPortfolioName?: string
    ) {}
}
