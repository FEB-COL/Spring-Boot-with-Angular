import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSurvey } from 'app/shared/model/gear-survey.model';
import { GearSurveyService } from './gear-survey.service';

@Component({
    selector: 'jhi-gear-survey-delete-dialog',
    templateUrl: './gear-survey-delete-dialog.component.html'
})
export class GearSurveyDeleteDialogComponent {
    gearSurvey: IGearSurvey;

    constructor(private gearSurveyService: GearSurveyService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSurveyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSurveyListModification',
                content: 'Deleted an gearSurvey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-survey-delete-popup',
    template: ''
})
export class GearSurveyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurvey }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSurveyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearSurvey = gearSurvey;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
