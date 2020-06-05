import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearIteration } from 'app/shared/model/gear-iteration.model';
import { GearIterationService } from './gear-iteration.service';
import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearProjectService } from 'app/entities/gear-project';

@Component({
    selector: 'jhi-gear-iteration-update',
    templateUrl: './gear-iteration-update.component.html'
})
export class GearIterationUpdateComponent implements OnInit {
    gearIteration: IGearIteration;
    isSaving: boolean;

    gearprojects: IGearProject[];
    startDateDp: any;
    endDateDp: any;
    creationDateDp: any;
    lastModifiedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearIterationService: GearIterationService,
        private gearProjectService: GearProjectService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearIteration }) => {
            this.gearIteration = gearIteration;
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
        if (this.gearIteration.id !== undefined) {
            this.subscribeToSaveResponse(this.gearIterationService.update(this.gearIteration));
        } else {
            this.subscribeToSaveResponse(this.gearIterationService.create(this.gearIteration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearIteration>>) {
        result.subscribe((res: HttpResponse<IGearIteration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
