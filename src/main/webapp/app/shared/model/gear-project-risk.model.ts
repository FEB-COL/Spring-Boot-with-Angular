import { Moment } from 'moment';
import { IGearRiskLog } from 'app/shared/model//gear-risk-log.model';

export interface IGearProjectRisk {
    id?: number;
    status?: string;
    impact?: number;
    probability?: number;
    description?: string;
    firstImpactDate?: Moment;
    mitigationStrategy?: string;
    mitigationDescription?: string;
    expectedCloseDate?: Moment;
    createdBy?: string;
    creationDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    gearRiskLogs?: IGearRiskLog[];
    gearProjectId?: number;
    gearProjectName?: string;
}

export class GearProjectRisk implements IGearProjectRisk {
    constructor(
        public id?: number,
        public status?: string,
        public impact?: number,
        public probability?: number,
        public description?: string,
        public firstImpactDate?: Moment,
        public mitigationStrategy?: string,
        public mitigationDescription?: string,
        public expectedCloseDate?: Moment,
        public createdBy?: string,
        public creationDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public gearRiskLogs?: IGearRiskLog[],
        public gearProjectId?: number,
        public gearProjectName?: string
    ) {}
}
