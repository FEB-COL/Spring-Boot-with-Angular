import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';
import { GearRiskLogService } from './gear-risk-log.service';
import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { GearProjectRiskService } from 'app/entities/gear-project-risk';

@Component({
    selector: 'jhi-gear-risk-log-update',
    templateUrl: './gear-risk-log-update.component.html'
})
export class GearRiskLogUpdateComponent implements OnInit {
    gearRiskLog: IGearRiskLog;
    isSaving: boolean;

    gearprojectrisks: IGearProjectRisk[];
    dateDp: any;
    creationDateDp: any;
    lastModifiedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearRiskLogService: GearRiskLogService,
        private gearProjectRiskService: GearProjectRiskService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearRiskLog }) => {
            this.gearRiskLog = gearRiskLog;
        });
        this.gearProjectRiskService.query().subscribe(
            (res: HttpResponse<IGearProjectRisk[]>) => {
                this.gearprojectrisks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearRiskLog.id !== undefined) {
            this.subscribeToSaveResponse(this.gearRiskLogService.update(this.gearRiskLog));
        } else {
            this.subscribeToSaveResponse(this.gearRiskLogService.create(this.gearRiskLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearRiskLog>>) {
        result.subscribe((res: HttpResponse<IGearRiskLog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearProjectRiskById(index: number, item: IGearProjectRisk) {
        return item.id;
    }
}
