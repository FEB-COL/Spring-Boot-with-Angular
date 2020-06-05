import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDecision } from 'app/shared/model/gear-decision.model';

@Component({
    selector: 'jhi-gear-decision-detail',
    templateUrl: './gear-decision-detail.component.html'
})
export class GearDecisionDetailComponent implements OnInit {
    gearDecision: IGearDecision;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDecision }) => {
            this.gearDecision = gearDecision;
        });
    }

    previousState() {
        window.history.back();
    }
}
