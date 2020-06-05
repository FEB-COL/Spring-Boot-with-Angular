import { Moment } from 'moment';
import { IGearProcessInfoSystem } from 'app/shared/model//gear-process-info-system.model';

export interface IGearValueChainProcess {
    id?: number;
    name?: string;
    decription?: string;
    creationDate?: Moment;
    lastUpdate?: Moment;
    attach?: string;
    draft?: boolean;
    inputs?: string;
    outputs?: string;
    gearprocessinfosystems?: IGearProcessInfoSystem[];
    gearvaluechainmacroprocessId?: number;
    gearvaluechainmacroprocessName?: string;
}

export class GearValueChainProcess implements IGearValueChainProcess {
    constructor(
        public id?: number,
        public name?: string,
        public decription?: string,
        public creationDate?: Moment,
        public lastUpdate?: Moment,
        public attach?: string,
        public draft?: boolean,
        public inputs?: string,
        public outputs?: string,
        public gearprocessinfosystems?: IGearProcessInfoSystem[],
        public gearvaluechainmacroprocessId?: number,
        public gearvaluechainmacroprocessName?: string
    ) {
        this.draft = this.draft || false;
    }
}
