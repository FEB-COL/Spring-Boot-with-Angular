import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { GearValueChainProcessService } from './gear-value-chain-process.service';

@Component({
    selector: 'jhi-gear-value-chain-process-delete-dialog',
    templateUrl: './gear-value-chain-process-delete-dialog.component.html'
})
export class GearValueChainProcessDeleteDialogComponent {
    gearValueChainProcess: IGearValueChainProcess;

    constructor(
        private gearValueChainProcessService: GearValueChainProcessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearValueChainProcessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearValueChainProcessListModification',
                content: 'Deleted an gearValueChainProcess'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-value-chain-process-delete-popup',
    template: ''
})
export class GearValueChainProcessDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainProcess }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearValueChainProcessDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearValueChainProcess = gearValueChainProcess;
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
