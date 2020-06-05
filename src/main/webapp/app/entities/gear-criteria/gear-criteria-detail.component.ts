import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearCriteria } from 'app/shared/model/gear-criteria.model';

@Component({
    selector: 'jhi-gear-criteria-detail',
    templateUrl: './gear-criteria-detail.component.html'
})
export class GearCriteriaDetailComponent implements OnInit {
    gearCriteria: IGearCriteria;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearCriteria }) => {
            this.gearCriteria = gearCriteria;
        });
    }

    previousState() {
        window.history.back();
    }
}
