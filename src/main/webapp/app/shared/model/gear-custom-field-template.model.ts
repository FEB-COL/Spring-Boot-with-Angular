export interface IGearCustomFieldTemplate {
    id?: number;
    labelField?: string;
    defaultValue?: string;
    fieldType?: number;
    listOptions?: string;
    gearDdocumenttypeId?: number;
    gearDdocumenttypeName?: string;
}

export class GearCustomFieldTemplate implements IGearCustomFieldTemplate {
    constructor(
        public id?: number,
        public labelField?: string,
        public defaultValue?: string,
        public fieldType?: number,
        public listOptions?: string,
        public gearDdocumenttypeId?: number,
        public gearDdocumenttypeName?: string
    ) {}
}
