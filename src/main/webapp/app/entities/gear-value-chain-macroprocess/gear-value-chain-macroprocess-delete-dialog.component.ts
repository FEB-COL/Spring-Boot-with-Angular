import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
import { GearValueChainMacroprocessService } from './gear-value-chain-macroprocess.service';

@Component({
    selector: 'jhi-gear-value-chain-macroprocess-delete-dialog',
    templateUrl: './gear-value-chain-macroprocess-delete-dialog.component.html'
})
export class GearValueChainMacroprocessDeleteDialogComponent {
    gearValueChainMacroprocess: IGearValueChainMacroprocess;

    constructor(
        private gearValueChainMacroprocessService: GearValueChainMacroprocessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearValueChainMacroprocessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearValueChainMacroprocessListModification',
                content: 'Deleted an gearValueChainMacroprocess'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-value-chain-macroprocess-delete-popup',
    template: ''
})
export class GearValueChainMacroprocessDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainMacroprocess }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearValueChainMacroprocessDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearValueChainMacroprocess = gearValueChainMacroprocess;
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
