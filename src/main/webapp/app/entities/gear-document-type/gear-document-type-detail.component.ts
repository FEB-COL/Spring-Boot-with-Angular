import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

@Component({
    selector: 'jhi-gear-document-type-detail',
    templateUrl: './gear-document-type-detail.component.html'
})
export class GearDocumentTypeDetailComponent implements OnInit {
    gearDocumentType: IGearDocumentType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDocumentType }) => {
            this.gearDocumentType = gearDocumentType;
        });
    }

    previousState() {
        window.history.back();
    }
}
