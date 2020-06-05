import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearAmbit } from 'app/shared/model/gear-ambit.model';
import { GearAmbitService } from './gear-ambit.service';

@Component({
    selector: 'jhi-gear-ambit-update',
    templateUrl: './gear-ambit-update.component.html'
})
export class GearAmbitUpdateComponent implements OnInit {
    gearAmbit: IGearAmbit;
    isSaving: boolean;

    constructor(private gearAmbitService: GearAmbitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearAmbit }) => {
            this.gearAmbit = gearAmbit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearAmbit.id !== undefined) {
            this.subscribeToSaveResponse(this.gearAmbitService.update(this.gearAmbit));
        } else {
            this.subscribeToSaveResponse(this.gearAmbitService.create(this.gearAmbit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearAmbit>>) {
        result.subscribe((res: HttpResponse<IGearAmbit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
