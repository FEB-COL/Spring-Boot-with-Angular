import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearCriteria } from 'app/shared/model/gear-criteria.model';
import { GearCriteriaService } from './gear-criteria.service';

@Component({
    selector: 'jhi-gear-criteria-delete-dialog',
    templateUrl: './gear-criteria-delete-dialog.component.html'
})
export class GearCriteriaDeleteDialogComponent {
    gearCriteria: IGearCriteria;

    constructor(
        private gearCriteriaService: GearCriteriaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearCriteriaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearCriteriaListModification',
                content: 'Deleted an gearCriteria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-criteria-delete-popup',
    template: ''
})
export class GearCriteriaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearCriteria }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearCriteriaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearCriteria = gearCriteria;
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
