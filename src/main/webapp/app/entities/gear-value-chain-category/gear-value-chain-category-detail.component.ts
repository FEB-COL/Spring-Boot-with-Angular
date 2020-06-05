import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

@Component({
    selector: 'jhi-gear-value-chain-category-detail',
    templateUrl: './gear-value-chain-category-detail.component.html'
})
export class GearValueChainCategoryDetailComponent implements OnInit {
    gearValueChainCategory: IGearValueChainCategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainCategory }) => {
            this.gearValueChainCategory = gearValueChainCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
