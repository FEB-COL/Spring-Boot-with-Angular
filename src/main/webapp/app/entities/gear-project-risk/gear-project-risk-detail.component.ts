import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';

@Component({
    selector: 'jhi-gear-project-risk-detail',
    templateUrl: './gear-project-risk-detail.component.html'
})
export class GearProjectRiskDetailComponent implements OnInit {
    gearProjectRisk: IGearProjectRisk;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProjectRisk }) => {
            this.gearProjectRisk = gearProjectRisk;
        });
    }

    previousState() {
        window.history.back();
    }
}
