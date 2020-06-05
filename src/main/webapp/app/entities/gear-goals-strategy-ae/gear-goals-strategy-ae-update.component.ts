import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { GearGoalsStrategyAEService } from './gear-goals-strategy-ae.service';

@Component({
    selector: 'jhi-gear-goals-strategy-ae-update',
    templateUrl: './gear-goals-strategy-ae-update.component.html'
})
export class GearGoalsStrategyAEUpdateComponent implements OnInit {
    gearGoalsStrategyAE: IGearGoalsStrategyAE;
    isSaving: boolean;

    constructor(private gearGoalsStrategyAEService: GearGoalsStrategyAEService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearGoalsStrategyAE }) => {
            this.gearGoalsStrategyAE = gearGoalsStrategyAE;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearGoalsStrategyAE.id !== undefined) {
            this.subscribeToSaveResponse(this.gearGoalsStrategyAEService.update(this.gearGoalsStrategyAE));
        } else {
            this.subscribeToSaveResponse(this.gearGoalsStrategyAEService.create(this.gearGoalsStrategyAE));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearGoalsStrategyAE>>) {
        result.subscribe((res: HttpResponse<IGearGoalsStrategyAE>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
