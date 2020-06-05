import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { GearDiagnosisTypeService } from './gear-diagnosis-type.service';

@Component({
    selector: 'jhi-gear-diagnosis-type-delete-dialog',
    templateUrl: './gear-diagnosis-type-delete-dialog.component.html'
})
export class GearDiagnosisTypeDeleteDialogComponent {
    gearDiagnosisType: IGearDiagnosisType;

    constructor(
        private gearDiagnosisTypeService: GearDiagnosisTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDiagnosisTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDiagnosisTypeListModification',
                content: 'Deleted an gearDiagnosisType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-diagnosis-type-delete-popup',
    template: ''
})
export class GearDiagnosisTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagnosisType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDiagnosisTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDiagnosisType = gearDiagnosisType;
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
