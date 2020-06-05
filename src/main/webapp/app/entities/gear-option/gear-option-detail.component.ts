import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearOption } from 'app/shared/model/gear-option.model';

@Component({
    selector: 'jhi-gear-option-detail',
    templateUrl: './gear-option-detail.component.html'
})
export class GearOptionDetailComponent implements OnInit {
    gearOption: IGearOption;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearOption }) => {
            this.gearOption = gearOption;
        });
    }

    previousState() {
        window.history.back();
    }
}
