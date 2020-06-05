import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';
import { GearProcessInfoSystemService } from './gear-process-info-system.service';

@Component({
    selector: 'jhi-gear-process-info-system-delete-dialog',
    templateUrl: './gear-process-info-system-delete-dialog.component.html'
})
export class GearProcessInfoSystemDeleteDialogComponent {
    gearProcessInfoSystem: IGearProcessInfoSystem;

    constructor(
        private gearProcessInfoSystemService: GearProcessInfoSystemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearProcessInfoSystemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearProcessInfoSystemListModification',
                content: 'Deleted an gearProcessInfoSystem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-process-info-system-delete-popup',
    template: ''
})
export class GearProcessInfoSystemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProcessInfoSystem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearProcessInfoSystemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearProcessInfoSystem = gearProcessInfoSystem;
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
