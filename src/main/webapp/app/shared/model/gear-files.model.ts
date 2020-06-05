export interface IGearFiles {
    id?: number;
    idFile?: string;
    documentName?: string;
    documentDomain?: string;
    documentTitle?: string;
    documentType?: string;
    documentDescription?: string;
    documentIsCopy?: boolean;
    documentIsDraft?: boolean;
    labelField?: string;
    typeField?: string;
    propertieName?: string;
    documentIdAlfresco?: string;
    folderIdAlfresco?: string;
    nameFolderAlfresco?: string;
    siteIdAlfresco?: string;
    nameSiteAlfresco?: string;
    valueField?: string;
    customFieldId?: number;
    templateId?: number;
    gearDomainName?: string;
    gearDomainId?: number;
}

export class GearFiles implements IGearFiles {
    constructor(
        public id?: number,
        public idFile?: string,
        public documentName?: string,
        public documentDomain?: string,
        public documentTitle?: string,
        public documentType?: string,
        public documentDescription?: string,
        public documentIsCopy?: boolean,
        public documentIsDraft?: boolean,
        public labelField?: string,
        public typeField?: string,
        public propertieName?: string,
        public documentIdAlfresco?: string,
        public folderIdAlfresco?: string,
        public nameFolderAlfresco?: string,
        public siteIdAlfresco?: string,
        public nameSiteAlfresco?: string,
        public valueField?: string,
        public customFieldId?: number,
        public templateId?: number,
        public gearDomainName?: string,
        public gearDomainId?: number
    ) {
        this.documentIsCopy = this.documentIsCopy || false;
        this.documentIsDraft = this.documentIsDraft || false;
    }
}
