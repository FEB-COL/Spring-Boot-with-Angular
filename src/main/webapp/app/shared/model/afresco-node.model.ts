import { IAlfrescoNodeProperties } from 'app/shared/model//alfresco-node-properties.model';

export interface IAfrescoNode {
    id?: number;
    createdAt?: string;
    modifiedAt?: string;
    name?: string;
    location?: string;
    nType?: string;
    parentId?: string;
    alfrescoProperties?: IAlfrescoNodeProperties[];
    alfrescoSiteId?: number;
}

export class AfrescoNode implements IAfrescoNode {
    constructor(
        public id?: number,
        public createdAt?: string,
        public modifiedAt?: string,
        public name?: string,
        public location?: string,
        public nType?: string,
        public parentId?: string,
        public alfrescoProperties?: IAlfrescoNodeProperties[],
        public alfrescoSiteId?: number
    ) {}
}
