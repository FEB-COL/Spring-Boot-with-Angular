import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

@Component({
    selector: 'jhi-gear-goals-strategy-ae-detail',
    templateUrl: './gear-goals-strategy-ae-detail.component.html'
})
export class GearGoalsStrategyAEDetailComponent implements OnInit {
    gearGoalsStrategyAE: IGearGoalsStrategyAE;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearGoalsStrategyAE }) => {
            this.gearGoalsStrategyAE = gearGoalsStrategyAE;
        });
    }

    previousState() {
        window.history.back();
    }
}
