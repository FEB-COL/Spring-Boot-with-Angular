import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';
import { GearRiskLogService } from './gear-risk-log.service';

@Component({
    selector: 'jhi-gear-risk-log-delete-dialog',
    templateUrl: './gear-risk-log-delete-dialog.component.html'
})
export class GearRiskLogDeleteDialogComponent {
    gearRiskLog: IGearRiskLog;

    constructor(
        private gearRiskLogService: GearRiskLogService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearRiskLogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearRiskLogListModification',
                content: 'Deleted an gearRiskLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-risk-log-delete-popup',
    template: ''
})
export class GearRiskLogDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearRiskLog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearRiskLogDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearRiskLog = gearRiskLog;
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
