export interface IGearSmartStrategyAE {
    id?: number;
    name?: string;
    drescription?: string;
    geargoalsstrategyaeId?: number;
    geargoalsstrategyaeName?: string;
}

export class GearSmartStrategyAE implements IGearSmartStrategyAE {
    constructor(
        public id?: number,
        public name?: string,
        public drescription?: string,
        public geargoalsstrategyaeId?: number,
        public geargoalsstrategyaeName?: string
    ) {}
}
