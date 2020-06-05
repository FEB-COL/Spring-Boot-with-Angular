import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { GearDocumentTypeService } from './gear-document-type.service';

@Component({
    selector: 'jhi-gear-document-type-delete-dialog',
    templateUrl: './gear-document-type-delete-dialog.component.html'
})
export class GearDocumentTypeDeleteDialogComponent {
    gearDocumentType: IGearDocumentType;

    constructor(
        private gearDocumentTypeService: GearDocumentTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDocumentTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDocumentTypeListModification',
                content: 'Deleted an gearDocumentType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-document-type-delete-popup',
    template: ''
})
export class GearDocumentTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDocumentType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDocumentTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDocumentType = gearDocumentType;
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
