import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParCoinType } from 'app/shared/model/par-coin-type.model';

@Component({
    selector: 'jhi-par-coin-type-detail',
    templateUrl: './par-coin-type-detail.component.html'
})
export class ParCoinTypeDetailComponent implements OnInit {
    parCoinType: IParCoinType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parCoinType }) => {
            this.parCoinType = parCoinType;
        });
    }

    previousState() {
        window.history.back();
    }
}
