import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

@Component({
    selector: 'jhi-gear-diagnosis-type-detail',
    templateUrl: './gear-diagnosis-type-detail.component.html'
})
export class GearDiagnosisTypeDetailComponent implements OnInit {
    gearDiagnosisType: IGearDiagnosisType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagnosisType }) => {
            this.gearDiagnosisType = gearDiagnosisType;
        });
    }

    previousState() {
        window.history.back();
    }
}
