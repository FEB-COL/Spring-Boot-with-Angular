import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from './gear-domain.service';

@Component({
    selector: 'jhi-gear-domain-update',
    templateUrl: './gear-domain-update.component.html',
    styleUrls: ['./gear-domain.component.scss']
})
export class GearDomainUpdateComponent implements OnInit {
    gearDomain: IGearDomain;
    isSaving: boolean;

    constructor(private gearDomainService: GearDomainService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDomain }) => {
            this.gearDomain = gearDomain;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDomain.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDomainService.update(this.gearDomain));
        } else {
            this.subscribeToSaveResponse(this.gearDomainService.create(this.gearDomain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDomain>>) {
        result.subscribe((res: HttpResponse<IGearDomain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
