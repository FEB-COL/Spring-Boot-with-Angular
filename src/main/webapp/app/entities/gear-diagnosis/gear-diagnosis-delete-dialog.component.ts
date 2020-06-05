import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { GearDiagnosisService } from './gear-diagnosis.service';

@Component({
    selector: 'jhi-gear-diagnosis-delete-dialog',
    templateUrl: './gear-diagnosis-delete-dialog.component.html'
})
export class GearDiagnosisDeleteDialogComponent {
    gearDiagnosis: IGearDiagnosis;

    constructor(
        private gearDiagnosisService: GearDiagnosisService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDiagnosisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDiagnosisListModification',
                content: 'Deleted an gearDiagnosis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-diagnosis-delete-popup',
    template: ''
})
export class GearDiagnosisDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagnosis }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDiagnosisDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearDiagnosis = gearDiagnosis;
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
