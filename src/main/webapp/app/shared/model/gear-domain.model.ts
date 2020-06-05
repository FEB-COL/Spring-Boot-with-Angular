import { IGearDocumentType } from 'app/shared/model//gear-document-type.model';
import { IGearAmbit } from 'app/shared/model//gear-ambit.model';
import { IGearFiles } from 'app/shared/model//gear-files.model';
import { IGearDiagnosis } from 'app/shared/model//gear-diagnosis.model';

export interface IGearDomain {
    id?: number;
    name?: string;
    domainId?: string;
    companyId?: number;
    companyDescription?: string;
    siteId?: string;
    jhiStorage?: number;
    storageUsed?: number;
    levelMaturity?: number;
    totalWiki?: number;
    totalFileFinalVersion?: number;
    totalFileDraft?: number;
    totalFileUpload?: number;
    geardocumenttypes?: IGearDocumentType[];
    gearAmbits?: IGearAmbit[];
    gearFiles?: IGearFiles[];
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
    gearDiagnoses?: IGearDiagnosis[];
}

export class GearDomain implements IGearDomain {
    constructor(
        public id?: number,
        public name?: string,
        public domainId?: string,
        public companyId?: number,
        public companyDescription?: string,
        public siteId?: string,
        public jhiStorage?: number,
        public storageUsed?: number,
        public levelMaturity?: number,
        public totalWiki?: number,
        public totalFileFinalVersion?: number,
        public totalFileDraft?: number,
        public totalFileUpload?: number,
        public geardocumenttypes?: IGearDocumentType[],
        public gearAmbits?: IGearAmbit[],
        public gearFiles?: IGearFiles[],
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number,
        public gearDiagnoses?: IGearDiagnosis[]
    ) {}
}
