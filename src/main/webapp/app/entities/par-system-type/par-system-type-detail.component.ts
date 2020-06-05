import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParSystemType } from 'app/shared/model/par-system-type.model';

@Component({
    selector: 'jhi-par-system-type-detail',
    templateUrl: './par-system-type-detail.component.html'
})
export class ParSystemTypeDetailComponent implements OnInit {
    parSystemType: IParSystemType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parSystemType }) => {
            this.parSystemType = parSystemType;
        });
    }

    previousState() {
        window.history.back();
    }
}
