import { IGearSmartStrategyAE } from 'app/shared/model//gear-smart-strategy-ae.model';

export interface IGearGoalsStrategyAE {
    id?: number;
    name?: string;
    drescription?: string;
    gearsmartstrategyaes?: IGearSmartStrategyAE[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
}

export class GearGoalsStrategyAE implements IGearGoalsStrategyAE {
    constructor(
        public id?: number,
        public name?: string,
        public drescription?: string,
        public gearsmartstrategyaes?: IGearSmartStrategyAE[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number
    ) {}
}
