import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParLicenceType } from 'app/shared/model/par-licence-type.model';
import { ParLicenceTypeService } from './par-licence-type.service';

@Component({
    selector: 'jhi-par-licence-type-delete-dialog',
    templateUrl: './par-licence-type-delete-dialog.component.html'
})
export class ParLicenceTypeDeleteDialogComponent {
    parLicenceType: IParLicenceType;

    constructor(
        private parLicenceTypeService: ParLicenceTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parLicenceTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parLicenceTypeListModification',
                content: 'Deleted an parLicenceType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-par-licence-type-delete-popup',
    template: ''
})
export class ParLicenceTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parLicenceType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParLicenceTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parLicenceType = parLicenceType;
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
