import { Moment } from 'moment';
import { IGearValueChainProcess } from 'app/shared/model//gear-value-chain-process.model';

export interface IGearValueChainMacroprocess {
    id?: number;
    name?: string;
    decription?: string;
    creationDate?: Moment;
    lastUpdate?: Moment;
    draft?: boolean;
    order?: number;
    gearvaluechainprocesses?: IGearValueChainProcess[];
    gearvaluechaincategoryId?: number;
    gearvaluechaincategoryName?: string;
}

export class GearValueChainMacroprocess implements IGearValueChainMacroprocess {
    constructor(
        public id?: number,
        public name?: string,
        public decription?: string,
        public creationDate?: Moment,
        public lastUpdate?: Moment,
        public draft?: boolean,
        public order?: number,
        public gearvaluechainprocesses?: IGearValueChainProcess[],
        public gearvaluechaincategoryId?: number,
        public gearvaluechaincategoryName?: string
    ) {
        this.draft = this.draft || false;
    }
}
