import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { GearGoalsStrategyAEService } from './gear-goals-strategy-ae.service';

@Component({
    selector: 'jhi-gear-goals-strategy-ae-delete-dialog',
    templateUrl: './gear-goals-strategy-ae-delete-dialog.component.html'
})
export class GearGoalsStrategyAEDeleteDialogComponent {
    gearGoalsStrategyAE: IGearGoalsStrategyAE;

    constructor(
        private gearGoalsStrategyAEService: GearGoalsStrategyAEService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearGoalsStrategyAEService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearGoalsStrategyAEListModification',
                content: 'Deleted an gearGoalsStrategyAE'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-goals-strategy-ae-delete-popup',
    template: ''
})
export class GearGoalsStrategyAEDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearGoalsStrategyAE }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearGoalsStrategyAEDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearGoalsStrategyAE = gearGoalsStrategyAE;
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
