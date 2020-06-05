import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { GearInformationSystemsService } from './gear-information-systems.service';

@Component({
    selector: 'jhi-gear-information-systems-delete-dialog',
    templateUrl: './gear-information-systems-delete-dialog.component.html'
})
export class GearInformationSystemsDeleteDialogComponent {
    gearInformationSystems: IGearInformationSystems;

    constructor(
        private gearInformationSystemsService: GearInformationSystemsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearInformationSystemsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearInformationSystemsListModification',
                content: 'Deleted an gearInformationSystems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-information-systems-delete-popup',
    template: ''
})
export class GearInformationSystemsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearInformationSystems }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearInformationSystemsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearInformationSystems = gearInformationSystems;
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
