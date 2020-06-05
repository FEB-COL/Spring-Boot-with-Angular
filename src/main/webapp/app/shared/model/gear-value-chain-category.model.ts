import { Moment } from 'moment';
import { IGearValueChainMacroprocess } from 'app/shared/model//gear-value-chain-macroprocess.model';

export interface IGearValueChainCategory {
    id?: number;
    name?: string;
    decription?: string;
    color?: string;
    creationDate?: Moment;
    lastUpdate?: Moment;
    gearvaluechainmacroprocesses?: IGearValueChainMacroprocess[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
}

export class GearValueChainCategory implements IGearValueChainCategory {
    constructor(
        public id?: number,
        public name?: string,
        public decription?: string,
        public color?: string,
        public creationDate?: Moment,
        public lastUpdate?: Moment,
        public gearvaluechainmacroprocesses?: IGearValueChainMacroprocess[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number
    ) {}
}
