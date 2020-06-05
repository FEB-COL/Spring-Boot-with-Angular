import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { GearDiagnosisService } from './gear-diagnosis.service';
import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { GearDiagnosisTypeService } from 'app/entities/gear-diagnosis-type';

@Component({
    selector: 'jhi-gear-diagnosis-update',
    templateUrl: './gear-diagnosis-update.component.html'
})
export class GearDiagnosisUpdateComponent implements OnInit {
    gearDiagnosis: IGearDiagnosis;
    isSaving: boolean;

    geardiagnosistypes: IGearDiagnosisType[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearDiagnosisService: GearDiagnosisService,
        private gearDiagnosisTypeService: GearDiagnosisTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDiagnosis }) => {
            this.gearDiagnosis = gearDiagnosis;
        });
        this.gearDiagnosisTypeService.query().subscribe(
            (res: HttpResponse<IGearDiagnosisType[]>) => {
                this.geardiagnosistypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDiagnosis.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDiagnosisService.update(this.gearDiagnosis));
        } else {
            this.subscribeToSaveResponse(this.gearDiagnosisService.create(this.gearDiagnosis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagnosis>>) {
        result.subscribe((res: HttpResponse<IGearDiagnosis>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDiagnosisTypeById(index: number, item: IGearDiagnosisType) {
        return item.id;
    }
}
