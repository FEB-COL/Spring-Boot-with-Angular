import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { GearDiagnosisTypeService } from './gear-diagnosis-type.service';

@Component({
    selector: 'jhi-gear-diagnosis-type-update',
    templateUrl: './gear-diagnosis-type-update.component.html'
})
export class GearDiagnosisTypeUpdateComponent implements OnInit {
    gearDiagnosisType: IGearDiagnosisType;
    isSaving: boolean;

    constructor(private gearDiagnosisTypeService: GearDiagnosisTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDiagnosisType }) => {
            this.gearDiagnosisType = gearDiagnosisType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDiagnosisType.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDiagnosisTypeService.update(this.gearDiagnosisType));
        } else {
            this.subscribeToSaveResponse(this.gearDiagnosisTypeService.create(this.gearDiagnosisType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagnosisType>>) {
        result.subscribe((res: HttpResponse<IGearDiagnosisType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
