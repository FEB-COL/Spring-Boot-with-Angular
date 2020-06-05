import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearIteration } from 'app/shared/model/gear-iteration.model';
import { GearIterationService } from './gear-iteration.service';

@Component({
    selector: 'jhi-gear-iteration-delete-dialog',
    templateUrl: './gear-iteration-delete-dialog.component.html'
})
export class GearIterationDeleteDialogComponent {
    gearIteration: IGearIteration;

    constructor(
        private gearIterationService: GearIterationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearIterationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearIterationListModification',
                content: 'Deleted an gearIteration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-iteration-delete-popup',
    template: ''
})
export class GearIterationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearIteration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearIterationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearIteration = gearIteration;
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
