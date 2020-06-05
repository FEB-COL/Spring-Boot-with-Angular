import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';
import { GearSurveyAnswerService } from './gear-survey-answer.service';

@Component({
    selector: 'jhi-gear-survey-answer-delete-dialog',
    templateUrl: './gear-survey-answer-delete-dialog.component.html'
})
export class GearSurveyAnswerDeleteDialogComponent {
    gearSurveyAnswer: IGearSurveyAnswer;

    constructor(
        private gearSurveyAnswerService: GearSurveyAnswerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSurveyAnswerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSurveyAnswerListModification',
                content: 'Deleted an gearSurveyAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-survey-answer-delete-popup',
    template: ''
})
export class GearSurveyAnswerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyAnswer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSurveyAnswerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearSurveyAnswer = gearSurveyAnswer;
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
