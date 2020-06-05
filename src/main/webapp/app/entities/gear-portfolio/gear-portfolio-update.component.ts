import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';
import { GearPortfolioService } from './gear-portfolio.service';

@Component({
    selector: 'jhi-gear-portfolio-update',
    templateUrl: './gear-portfolio-update.component.html'
})
export class GearPortfolioUpdateComponent implements OnInit {
    gearPortfolio: IGearPortfolio;
    isSaving: boolean;
    startDateDp: any;
    creationDateDp: any;
    lastModifiedDateDp: any;

    constructor(private gearPortfolioService: GearPortfolioService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearPortfolio }) => {
            this.gearPortfolio = gearPortfolio;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearPortfolio.id !== undefined) {
            this.subscribeToSaveResponse(this.gearPortfolioService.update(this.gearPortfolio));
        } else {
            this.subscribeToSaveResponse(this.gearPortfolioService.create(this.gearPortfolio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearPortfolio>>) {
        result.subscribe((res: HttpResponse<IGearPortfolio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
