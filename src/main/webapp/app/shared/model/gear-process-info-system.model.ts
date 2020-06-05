export interface IGearProcessInfoSystem {
    id?: number;
    gearinformationsystemsId?: number;
    gearvaluechainprocessId?: number;
}

export class GearProcessInfoSystem implements IGearProcessInfoSystem {
    constructor(public id?: number, public gearinformationsystemsId?: number, public gearvaluechainprocessId?: number) {}
}
