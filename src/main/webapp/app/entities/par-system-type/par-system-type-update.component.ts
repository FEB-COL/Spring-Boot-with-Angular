import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParSystemType } from 'app/shared/model/par-system-type.model';
import { ParSystemTypeService } from './par-system-type.service';

@Component({
    selector: 'jhi-par-system-type-update',
    templateUrl: './par-system-type-update.component.html'
})
export class ParSystemTypeUpdateComponent implements OnInit {
    parSystemType: IParSystemType;
    isSaving: boolean;

    constructor(private parSystemTypeService: ParSystemTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parSystemType }) => {
            this.parSystemType = parSystemType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parSystemType.id !== undefined) {
            this.subscribeToSaveResponse(this.parSystemTypeService.update(this.parSystemType));
        } else {
            this.subscribeToSaveResponse(this.parSystemTypeService.create(this.parSystemType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParSystemType>>) {
        result.subscribe((res: HttpResponse<IParSystemType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
