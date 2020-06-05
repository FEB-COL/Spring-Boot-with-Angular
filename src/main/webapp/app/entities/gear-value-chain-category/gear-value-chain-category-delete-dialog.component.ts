import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
import { GearValueChainCategoryService } from './gear-value-chain-category.service';

@Component({
    selector: 'jhi-gear-value-chain-category-delete-dialog',
    templateUrl: './gear-value-chain-category-delete-dialog.component.html'
})
export class GearValueChainCategoryDeleteDialogComponent {
    gearValueChainCategory: IGearValueChainCategory;

    constructor(
        private gearValueChainCategoryService: GearValueChainCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearValueChainCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearValueChainCategoryListModification',
                content: 'Deleted an gearValueChainCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-value-chain-category-delete-popup',
    template: ''
})
export class GearValueChainCategoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearValueChainCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearValueChainCategory = gearValueChainCategory;
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
