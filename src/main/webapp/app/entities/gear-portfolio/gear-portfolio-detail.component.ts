import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';

@Component({
    selector: 'jhi-gear-portfolio-detail',
    templateUrl: './gear-portfolio-detail.component.html'
})
export class GearPortfolioDetailComponent implements OnInit {
    gearPortfolio: IGearPortfolio;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearPortfolio }) => {
            this.gearPortfolio = gearPortfolio;
        });
    }

    previousState() {
        window.history.back();
    }
}
