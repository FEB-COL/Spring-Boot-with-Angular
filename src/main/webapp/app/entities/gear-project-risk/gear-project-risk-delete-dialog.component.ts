import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { GearProjectRiskService } from './gear-project-risk.service';

@Component({
    selector: 'jhi-gear-project-risk-delete-dialog',
    templateUrl: './gear-project-risk-delete-dialog.component.html'
})
export class GearProjectRiskDeleteDialogComponent {
    gearProjectRisk: IGearProjectRisk;

    constructor(
        private gearProjectRiskService: GearProjectRiskService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearProjectRiskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearProjectRiskListModification',
                content: 'Deleted an gearProjectRisk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-project-risk-delete-popup',
    template: ''
})
export class GearProjectRiskDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProjectRisk }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearProjectRiskDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearProjectRisk = gearProjectRisk;
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
