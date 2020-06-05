import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearUser } from 'app/shared/model/gear-user.model';
import { GearUserService } from './gear-user.service';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit';

@Component({
    selector: 'jhi-gear-user-update',
    templateUrl: './gear-user-update.component.html'
})
export class GearUserUpdateComponent implements OnInit {
    gearUser: IGearUser;
    isSaving: boolean;

    gearorganizationalunits: IGearOrganizationalUnit[];
    lastUpdatePasswordDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearUserService: GearUserService,
        private gearOrganizationalUnitService: GearOrganizationalUnitService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearUser }) => {
            this.gearUser = gearUser;
        });
        this.gearOrganizationalUnitService.query().subscribe(
            (res: HttpResponse<IGearOrganizationalUnit[]>) => {
                this.gearorganizationalunits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearUser.id !== undefined) {
            this.subscribeToSaveResponse(this.gearUserService.update(this.gearUser));
        } else {
            this.subscribeToSaveResponse(this.gearUserService.create(this.gearUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearUser>>) {
        result.subscribe((res: HttpResponse<IGearUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearOrganizationalUnitById(index: number, item: IGearOrganizationalUnit) {
        return item.id;
    }
}
