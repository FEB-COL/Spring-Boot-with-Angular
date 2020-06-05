import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';
import { AlfrescoSiteService } from './alfresco-site.service';

@Component({
    selector: 'jhi-alfresco-site-update',
    templateUrl: './alfresco-site-update.component.html'
})
export class AlfrescoSiteUpdateComponent implements OnInit {
    alfrescoSite: IAlfrescoSite;
    isSaving: boolean;

    constructor(private alfrescoSiteService: AlfrescoSiteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ alfrescoSite }) => {
            this.alfrescoSite = alfrescoSite;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.alfrescoSite.id !== undefined) {
            this.subscribeToSaveResponse(this.alfrescoSiteService.update(this.alfrescoSite));
        } else {
            this.subscribeToSaveResponse(this.alfrescoSiteService.create(this.alfrescoSite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAlfrescoSite>>) {
        result.subscribe((res: HttpResponse<IAlfrescoSite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
