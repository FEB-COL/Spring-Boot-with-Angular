import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { GearDiagAnswerService } from './gear-diag-answer.service';

@Component({
    selector: 'jhi-gear-diag-answer-delete-dialog',
    templateUrl: './gear-diag-answer-delete-dialog.component.html'
})
export class GearDiagAnswerDeleteDialogComponent {
    gearDiagAnswer: IGearDiagAnswer;

    constructor(
        private gearDiagAnswerService: GearDiagAnswerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDiagAnswerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDiagAnswerListModification',
                content: 'Deleted an gearDiagAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-diag-answer-delete-popup',
    template: ''
})
export class GearDiagAnswerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagAnswer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDiagAnswerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDiagAnswer = gearDiagAnswer;
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
