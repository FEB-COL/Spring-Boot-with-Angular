import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { GearDiagQuestionService } from './gear-diag-question.service';

@Component({
    selector: 'jhi-gear-diag-question-delete-dialog',
    templateUrl: './gear-diag-question-delete-dialog.component.html'
})
export class GearDiagQuestionDeleteDialogComponent {
    gearDiagQuestion: IGearDiagQuestion;

    constructor(
        private gearDiagQuestionService: GearDiagQuestionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDiagQuestionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDiagQuestionListModification',
                content: 'Deleted an gearDiagQuestion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-diag-question-delete-popup',
    template: ''
})
export class GearDiagQuestionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagQuestion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDiagQuestionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDiagQuestion = gearDiagQuestion;
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
