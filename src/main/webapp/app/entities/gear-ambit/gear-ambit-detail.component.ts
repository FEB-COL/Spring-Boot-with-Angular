import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearAmbit } from 'app/shared/model/gear-ambit.model';

@Component({
    selector: 'jhi-gear-ambit-detail',
    templateUrl: './gear-ambit-detail.component.html'
})
export class GearAmbitDetailComponent implements OnInit {
    gearAmbit: IGearAmbit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearAmbit }) => {
            this.gearAmbit = gearAmbit;
        });
    }

    previousState() {
        window.history.back();
    }
}
