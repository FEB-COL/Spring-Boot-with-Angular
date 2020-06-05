import { IGearCustomFieldTemplate } from 'app/shared/model//gear-custom-field-template.model';

export interface IGearDocumentType {
    id?: number;
    name?: string;
    gearcustomfieldtemplates?: IGearCustomFieldTemplate[];
    geardomainId?: number;
    geardomainName?: string;
}

export class GearDocumentType implements IGearDocumentType {
    constructor(
        public id?: number,
        public name?: string,
        public gearcustomfieldtemplates?: IGearCustomFieldTemplate[],
        public geardomainId?: number,
        public geardomainName?: string
    ) {}
}
