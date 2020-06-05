import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParLicenceType } from 'app/shared/model/par-licence-type.model';

@Component({
    selector: 'jhi-par-licence-type-detail',
    templateUrl: './par-licence-type-detail.component.html'
})
export class ParLicenceTypeDetailComponent implements OnInit {
    parLicenceType: IParLicenceType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parLicenceType }) => {
            this.parLicenceType = parLicenceType;
        });
    }

    previousState() {
        window.history.back();
    }
}
