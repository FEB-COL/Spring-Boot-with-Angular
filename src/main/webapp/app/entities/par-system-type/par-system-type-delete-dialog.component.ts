import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParSystemType } from 'app/shared/model/par-system-type.model';
import { ParSystemTypeService } from './par-system-type.service';

@Component({
    selector: 'jhi-par-system-type-delete-dialog',
    templateUrl: './par-system-type-delete-dialog.component.html'
})
export class ParSystemTypeDeleteDialogComponent {
    parSystemType: IParSystemType;

    constructor(
        private parSystemTypeService: ParSystemTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parSystemTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parSystemTypeListModification',
                content: 'Deleted an parSystemType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-par-system-type-delete-popup',
    template: ''
})
export class ParSystemTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parSystemType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParSystemTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parSystemType = parSystemType;
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
