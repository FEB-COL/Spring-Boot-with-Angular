import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParLicenceType } from 'app/shared/model/par-licence-type.model';
import { ParLicenceTypeService } from './par-licence-type.service';

@Component({
    selector: 'jhi-par-licence-type-update',
    templateUrl: './par-licence-type-update.component.html'
})
export class ParLicenceTypeUpdateComponent implements OnInit {
    parLicenceType: IParLicenceType;
    isSaving: boolean;

    constructor(private parLicenceTypeService: ParLicenceTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parLicenceType }) => {
            this.parLicenceType = parLicenceType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parLicenceType.id !== undefined) {
            this.subscribeToSaveResponse(this.parLicenceTypeService.update(this.parLicenceType));
        } else {
            this.subscribeToSaveResponse(this.parLicenceTypeService.create(this.parLicenceType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParLicenceType>>) {
        result.subscribe((res: HttpResponse<IParLicenceType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
