import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';

@Component({
    selector: 'jhi-gear-diagnosis-detail',
    templateUrl: './gear-diagnosis-detail.component.html'
})
export class GearDiagnosisDetailComponent implements OnInit {
    gearDiagnosis: IGearDiagnosis;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagnosis }) => {
            this.gearDiagnosis = gearDiagnosis;
        });
    }

    previousState() {
        window.history.back();
    }
}
