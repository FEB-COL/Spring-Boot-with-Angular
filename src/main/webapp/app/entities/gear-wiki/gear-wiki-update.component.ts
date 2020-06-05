import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearWiki } from 'app/shared/model/gear-wiki.model';
import { GearWikiService } from './gear-wiki.service';

@Component({
    selector: 'jhi-gear-wiki-update',
    templateUrl: './gear-wiki-update.component.html'
})
export class GearWikiUpdateComponent implements OnInit {
    gearWiki: IGearWiki;
    isSaving: boolean;

    constructor(private gearWikiService: GearWikiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearWiki }) => {
            this.gearWiki = gearWiki;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearWiki.id !== undefined) {
            this.subscribeToSaveResponse(this.gearWikiService.update(this.gearWiki));
        } else {
            this.subscribeToSaveResponse(this.gearWikiService.create(this.gearWiki));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearWiki>>) {
        result.subscribe((res: HttpResponse<IGearWiki>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
