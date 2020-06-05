import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { GearProjectRiskService } from './gear-project-risk.service';
import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearProjectService } from 'app/entities/gear-project';

@Component({
    selector: 'jhi-gear-project-risk-update',
    templateUrl: './gear-project-risk-update.component.html'
})
export class GearProjectRiskUpdateComponent implements OnInit {
    gearProjectRisk: IGearProjectRisk;
    isSaving: boolean;

    gearprojects: IGearProject[];
    firstImpactDateDp: any;
    expectedCloseDateDp: any;
    creationDateDp: any;
    lastModifiedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearProjectRiskService: GearProjectRiskService,
        private gearProjectService: GearProjectService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearProjectRisk }) => {
            this.gearProjectRisk = gearProjectRisk;
        });
        this.gearProjectService.query().subscribe(
            (res: HttpResponse<IGearProject[]>) => {
                this.gearprojects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearProjectRisk.id !== undefined) {
            this.subscribeToSaveResponse(this.gearProjectRiskService.update(this.gearProjectRisk));
        } else {
            this.subscribeToSaveResponse(this.gearProjectRiskService.create(this.gearProjectRisk));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearProjectRisk>>) {
        result.subscribe((res: HttpResponse<IGearProjectRisk>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearProjectById(index: number, item: IGearProject) {
        return item.id;
    }
}
