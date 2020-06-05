import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

@Component({
    selector: 'jhi-gear-survey-solve-detail',
    templateUrl: './gear-survey-solve-detail.component.html'
})
export class GearSurveySolveDetailComponent implements OnInit {
    gearSurveySolve: IGearSurveySolve;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveySolve }) => {
            this.gearSurveySolve = gearSurveySolve;
        });
    }

    previousState() {
        window.history.back();
    }
}
