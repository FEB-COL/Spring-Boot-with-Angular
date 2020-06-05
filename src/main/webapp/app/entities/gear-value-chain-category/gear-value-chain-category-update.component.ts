import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
import { GearValueChainCategoryService } from './gear-value-chain-category.service';

@Component({
    selector: 'jhi-gear-value-chain-category-update',
    templateUrl: './gear-value-chain-category-update.component.html'
})
export class GearValueChainCategoryUpdateComponent implements OnInit {
    gearValueChainCategory: IGearValueChainCategory;
    isSaving: boolean;
    creationDateDp: any;
    lastUpdateDp: any;

    constructor(private gearValueChainCategoryService: GearValueChainCategoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearValueChainCategory }) => {
            this.gearValueChainCategory = gearValueChainCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearValueChainCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.gearValueChainCategoryService.update(this.gearValueChainCategory));
        } else {
            this.subscribeToSaveResponse(this.gearValueChainCategoryService.create(this.gearValueChainCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainCategory>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainCategory>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
