import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { GearOrganizationalUnitService } from './gear-organizational-unit.service';

@Component({
    selector: 'jhi-gear-organizational-unit-update',
    templateUrl: './gear-organizational-unit-update.component.html'
})
export class GearOrganizationalUnitUpdateComponent implements OnInit {
    gearOrganizationalUnit: IGearOrganizationalUnit;
    isSaving: boolean;

    constructor(private gearOrganizationalUnitService: GearOrganizationalUnitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearOrganizationalUnit }) => {
            this.gearOrganizationalUnit = gearOrganizationalUnit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearOrganizationalUnit.id !== undefined) {
            this.subscribeToSaveResponse(this.gearOrganizationalUnitService.update(this.gearOrganizationalUnit));
        } else {
            this.subscribeToSaveResponse(this.gearOrganizationalUnitService.create(this.gearOrganizationalUnit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearOrganizationalUnit>>) {
        result.subscribe(
            (res: HttpResponse<IGearOrganizationalUnit>) => this.onSaveSuccess(),
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
