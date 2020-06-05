export interface IAlFileUpload {
    documentName?: any;
    documentTitle?: any;
    documentType?: any;
    nodeId?: any;
    documentDomain?: any;
    documentDescription?: any;
    documentIsDraf?: any;
}

export class FileUpload implements IAlFileUpload {
    constructor(
        public documentName?: any,
        public documentTitle?: any,
        public documentType?: any,
        public nodeId?: any,
        public documentDomain?: any,
        public documentDescription?: any,
        public documentIsDraf?: any
    ) {}
}
