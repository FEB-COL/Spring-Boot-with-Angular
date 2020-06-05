import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';
import { GearSurveyQuestionTypeService } from './gear-survey-question-type.service';

@Component({
    selector: 'jhi-gear-survey-question-type-delete-dialog',
    templateUrl: './gear-survey-question-type-delete-dialog.component.html'
})
export class GearSurveyQuestionTypeDeleteDialogComponent {
    gearSurveyQuestionType: IGearSurveyQuestionType;

    constructor(
        private gearSurveyQuestionTypeService: GearSurveyQuestionTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSurveyQuestionTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSurveyQuestionTypeListModification',
                content: 'Deleted an gearSurveyQuestionType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-survey-question-type-delete-popup',
    template: ''
})
export class GearSurveyQuestionTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyQuestionType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSurveyQuestionTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearSurveyQuestionType = gearSurveyQuestionType;
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
