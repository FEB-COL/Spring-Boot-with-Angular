import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { GearInformationSystemsService } from './gear-information-systems.service';

@Component({
    selector: 'jhi-gear-information-systems-update',
    templateUrl: './gear-information-systems-update.component.html'
})
export class GearInformationSystemsUpdateComponent implements OnInit {
    gearInformationSystems: IGearInformationSystems;
    isSaving: boolean;
    acquisitionDateDp: any;
    startDateDp: any;
    creationDateDp: any;
    modifyDateDp: any;

    constructor(private gearInformationSystemsService: GearInformationSystemsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearInformationSystems }) => {
            this.gearInformationSystems = gearInformationSystems;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearInformationSystems.id !== undefined) {
            this.subscribeToSaveResponse(this.gearInformationSystemsService.update(this.gearInformationSystems));
        } else {
            this.subscribeToSaveResponse(this.gearInformationSystemsService.create(this.gearInformationSystems));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearInformationSystems>>) {
        result.subscribe(
            (res: HttpResponse<IGearInformationSystems>) => this.onSaveSuccess(),
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
