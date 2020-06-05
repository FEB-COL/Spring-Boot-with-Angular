export interface IAlfrescoNodeProperties {
    id?: number;
    documentType?: string;
    documentTitle?: string;
    fileName?: string;
    siteId?: string;
    description?: string;
    notes?: string;
    versionType?: string;
    versionLabel?: string;
    textField1?: string;
    textField2?: string;
    textField3?: string;
    textField4?: string;
    textField5?: string;
    textField6?: string;
    textField7?: string;
    alfrescoNodeId?: number;
}

export class AlfrescoNodeProperties implements IAlfrescoNodeProperties {
    constructor(
        public id?: number,
        public documentType?: string,
        public documentTitle?: string,
        public fileName?: string,
        public siteId?: string,
        public description?: string,
        public notes?: string,
        public versionType?: string,
        public versionLabel?: string,
        public textField1?: string,
        public textField2?: string,
        public textField3?: string,
        public textField4?: string,
        public textField5?: string,
        public textField6?: string,
        public textField7?: string,
        public alfrescoNodeId?: number
    ) {}
}
