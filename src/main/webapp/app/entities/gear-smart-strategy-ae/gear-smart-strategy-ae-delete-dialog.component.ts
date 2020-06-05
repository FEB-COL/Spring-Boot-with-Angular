import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
import { GearSmartStrategyAEService } from './gear-smart-strategy-ae.service';

@Component({
    selector: 'jhi-gear-smart-strategy-ae-delete-dialog',
    templateUrl: './gear-smart-strategy-ae-delete-dialog.component.html'
})
export class GearSmartStrategyAEDeleteDialogComponent {
    gearSmartStrategyAE: IGearSmartStrategyAE;

    constructor(
        private gearSmartStrategyAEService: GearSmartStrategyAEService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSmartStrategyAEService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSmartStrategyAEListModification',
                content: 'Deleted an gearSmartStrategyAE'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-smart-strategy-ae-delete-popup',
    template: ''
})
export class GearSmartStrategyAEDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSmartStrategyAE }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSmartStrategyAEDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearSmartStrategyAE = gearSmartStrategyAE;
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
