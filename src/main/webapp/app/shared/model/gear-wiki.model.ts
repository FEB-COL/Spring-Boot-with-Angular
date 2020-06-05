export interface IGearWiki {
    id?: number;
    title?: string;
    text?: string;
    idImage?: string;
}

export class GearWiki implements IGearWiki {
    constructor(public id?: number, public title?: string, public text?: string, public idImage?: string) {}
}
