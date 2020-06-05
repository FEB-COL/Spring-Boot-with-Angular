import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAfrescoNode } from 'app/shared/model/afresco-node.model';
import { AfrescoNodeService } from './afresco-node.service';
import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';
import { AlfrescoSiteService } from 'app/entities/alfresco-site';

@Component({
    selector: 'jhi-afresco-node-update',
    templateUrl: './afresco-node-update.component.html'
})
export class AfrescoNodeUpdateComponent implements OnInit {
    afrescoNode: IAfrescoNode;
    isSaving: boolean;

    alfrescosites: IAlfrescoSite[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private afrescoNodeService: AfrescoNodeService,
        private alfrescoSiteService: AlfrescoSiteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ afrescoNode }) => {
            this.afrescoNode = afrescoNode;
        });
        this.alfrescoSiteService.query().subscribe(
            (res: HttpResponse<IAlfrescoSite[]>) => {
                this.alfrescosites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.afrescoNode.id !== undefined) {
            this.subscribeToSaveResponse(this.afrescoNodeService.update(this.afrescoNode));
        } else {
            this.subscribeToSaveResponse(this.afrescoNodeService.create(this.afrescoNode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAfrescoNode>>) {
        result.subscribe((res: HttpResponse<IAfrescoNode>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAlfrescoSiteById(index: number, item: IAlfrescoSite) {
        return item.id;
    }
}
