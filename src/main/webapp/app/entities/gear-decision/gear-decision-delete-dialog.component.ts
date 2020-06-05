import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { GearDecisionService } from './gear-decision.service';

@Component({
    selector: 'jhi-gear-decision-delete-dialog',
    templateUrl: './gear-decision-delete-dialog.component.html'
})
export class GearDecisionDeleteDialogComponent {
    gearDecision: IGearDecision;

    constructor(
        private gearDecisionService: GearDecisionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDecisionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDecisionListModification',
                content: 'Deleted an gearDecision'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-decision-delete-popup',
    template: ''
})
export class GearDecisionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDecision }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDecisionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDecision = gearDecision;
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
