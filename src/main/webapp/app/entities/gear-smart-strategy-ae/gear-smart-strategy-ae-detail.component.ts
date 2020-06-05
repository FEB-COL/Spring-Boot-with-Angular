import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

@Component({
    selector: 'jhi-gear-smart-strategy-ae-detail',
    templateUrl: './gear-smart-strategy-ae-detail.component.html'
})
export class GearSmartStrategyAEDetailComponent implements OnInit {
    gearSmartStrategyAE: IGearSmartStrategyAE;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSmartStrategyAE }) => {
            this.gearSmartStrategyAE = gearSmartStrategyAE;
        });
    }

    previousState() {
        window.history.back();
    }
}
