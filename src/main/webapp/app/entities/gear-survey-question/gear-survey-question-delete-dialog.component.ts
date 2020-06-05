import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { GearSurveyQuestionService } from './gear-survey-question.service';

@Component({
    selector: 'jhi-gear-survey-question-delete-dialog',
    templateUrl: './gear-survey-question-delete-dialog.component.html'
})
export class GearSurveyQuestionDeleteDialogComponent {
    gearSurveyQuestion: IGearSurveyQuestion;

    constructor(
        private gearSurveyQuestionService: GearSurveyQuestionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSurveyQuestionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSurveyQuestionListModification',
                content: 'Deleted an gearSurveyQuestion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-survey-question-delete-popup',
    template: ''
})
export class GearSurveyQuestionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyQuestion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSurveyQuestionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearSurveyQuestion = gearSurveyQuestion;
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
