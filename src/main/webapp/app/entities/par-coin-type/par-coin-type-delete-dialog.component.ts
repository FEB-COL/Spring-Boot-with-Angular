import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParCoinType } from 'app/shared/model/par-coin-type.model';
import { ParCoinTypeService } from './par-coin-type.service';

@Component({
    selector: 'jhi-par-coin-type-delete-dialog',
    templateUrl: './par-coin-type-delete-dialog.component.html'
})
export class ParCoinTypeDeleteDialogComponent {
    parCoinType: IParCoinType;

    constructor(
        private parCoinTypeService: ParCoinTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parCoinTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parCoinTypeListModification',
                content: 'Deleted an parCoinType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-par-coin-type-delete-popup',
    template: ''
})
export class ParCoinTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parCoinType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParCoinTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parCoinType = parCoinType;
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
