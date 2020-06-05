import { IAfrescoNode } from 'app/shared/model//afresco-node.model';

export interface IAlfrescoSite {
    id?: number;
    guid?: string;
    identify?: string;
    role?: string;
    title?: string;
    description?: string;
    visibility?: string;
    alfrescoNodes?: IAfrescoNode[];
}

export class AlfrescoSite implements IAlfrescoSite {
    constructor(
        public id?: number,
        public guid?: string,
        public identify?: string,
        public role?: string,
        public title?: string,
        public description?: string,
        public visibility?: string,
        public alfrescoNodes?: IAfrescoNode[]
    ) {}
}
