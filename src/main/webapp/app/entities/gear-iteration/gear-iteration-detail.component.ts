import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearIteration } from 'app/shared/model/gear-iteration.model';

@Component({
    selector: 'jhi-gear-iteration-detail',
    templateUrl: './gear-iteration-detail.component.html'
})
export class GearIterationDetailComponent implements OnInit {
    gearIteration: IGearIteration;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearIteration }) => {
            this.gearIteration = gearIteration;
        });
    }

    previousState() {
        window.history.back();
    }
}
