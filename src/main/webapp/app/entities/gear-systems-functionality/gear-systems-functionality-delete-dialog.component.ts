import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';
import { GearSystemsFunctionalityService } from './gear-systems-functionality.service';

@Component({
    selector: 'jhi-gear-systems-functionality-delete-dialog',
    templateUrl: './gear-systems-functionality-delete-dialog.component.html'
})
export class GearSystemsFunctionalityDeleteDialogComponent {
    gearSystemsFunctionality: IGearSystemsFunctionality;

    constructor(
        private gearSystemsFunctionalityService: GearSystemsFunctionalityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearSystemsFunctionalityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearSystemsFunctionalityListModification',
                content: 'Deleted an gearSystemsFunctionality'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-systems-functionality-delete-popup',
    template: ''
})
export class GearSystemsFunctionalityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSystemsFunctionality }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearSystemsFunctionalityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearSystemsFunctionality = gearSystemsFunctionality;
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
