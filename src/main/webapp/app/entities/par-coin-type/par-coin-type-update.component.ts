import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParCoinType } from 'app/shared/model/par-coin-type.model';
import { ParCoinTypeService } from './par-coin-type.service';

@Component({
    selector: 'jhi-par-coin-type-update',
    templateUrl: './par-coin-type-update.component.html'
})
export class ParCoinTypeUpdateComponent implements OnInit {
    parCoinType: IParCoinType;
    isSaving: boolean;

    constructor(private parCoinTypeService: ParCoinTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parCoinType }) => {
            this.parCoinType = parCoinType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parCoinType.id !== undefined) {
            this.subscribeToSaveResponse(this.parCoinTypeService.update(this.parCoinType));
        } else {
            this.subscribeToSaveResponse(this.parCoinTypeService.create(this.parCoinType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParCoinType>>) {
        result.subscribe((res: HttpResponse<IParCoinType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
