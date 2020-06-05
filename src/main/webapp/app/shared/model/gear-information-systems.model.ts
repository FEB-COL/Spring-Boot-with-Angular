import { Moment } from 'moment';
import { IGearSystemsFunctionality } from 'app/shared/model//gear-systems-functionality.model';
import { IGearProcessInfoSystem } from 'app/shared/model//gear-process-info-system.model';

export interface IGearInformationSystems {
    id?: number;
    name?: string;
    description?: string;
    version?: string;
    acquisitionDate?: Moment;
    startDate?: Moment;
    responsible?: string;
    responsibleEmail?: string;
    provider?: string;
    initialCost?: number;
    mainteinanceCost?: number;
    creationDate?: Moment;
    modifyDate?: Moment;
    gearsystemsfunctionalities?: IGearSystemsFunctionality[];
    gearprocessinfosystems?: IGearProcessInfoSystem[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
    parCoinTypeName?: string;
    parCoinTypeId?: number;
}

export class GearInformationSystems implements IGearInformationSystems {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public version?: string,
        public acquisitionDate?: Moment,
        public startDate?: Moment,
        public responsible?: string,
        public responsibleEmail?: string,
        public provider?: string,
        public initialCost?: number,
        public mainteinanceCost?: number,
        public creationDate?: Moment,
        public modifyDate?: Moment,
        public gearsystemsfunctionalities?: IGearSystemsFunctionality[],
        public gearprocessinfosystems?: IGearProcessInfoSystem[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number,
        public parCoinTypeName?: string,
        public parCoinTypeId?: number
    ) {}
}
