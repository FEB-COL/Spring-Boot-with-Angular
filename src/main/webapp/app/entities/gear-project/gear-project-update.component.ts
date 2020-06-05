import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearProjectService } from './gear-project.service';
import { IGearIteration } from 'app/shared/model/gear-iteration.model';
import { GearIterationService } from 'app/entities/gear-iteration';
import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';
import { GearPortfolioService } from 'app/entities/gear-portfolio';

@Component({
    selector: 'jhi-gear-project-update',
    templateUrl: './gear-project-update.component.html'
})
export class GearProjectUpdateComponent implements OnInit {
    gearProject: IGearProject;
    isSaving: boolean;

    geariterations: IGearIteration[];

    gearportfolios: IGearPortfolio[];
    startDateDp: any;
    endDateDp: any;
    creationDateDp: any;
    lastModifiedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearProjectService: GearProjectService,
        private gearIterationService: GearIterationService,
        private gearPortfolioService: GearPortfolioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearProject }) => {
            this.gearProject = gearProject;
        });
        this.gearIterationService.query().subscribe(
            (res: HttpResponse<IGearIteration[]>) => {
                this.geariterations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearPortfolioService.query().subscribe(
            (res: HttpResponse<IGearPortfolio[]>) => {
                this.gearportfolios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearProject.id !== undefined) {
            this.subscribeToSaveResponse(this.gearProjectService.update(this.gearProject));
        } else {
            this.subscribeToSaveResponse(this.gearProjectService.create(this.gearProject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearProject>>) {
        result.subscribe((res: HttpResponse<IGearProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGearIterationById(index: number, item: IGearIteration) {
        return item.id;
    }

    trackGearPortfolioById(index: number, item: IGearPortfolio) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
