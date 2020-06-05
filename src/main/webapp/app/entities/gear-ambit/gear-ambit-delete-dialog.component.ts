import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearAmbit } from 'app/shared/model/gear-ambit.model';
import { GearAmbitService } from './gear-ambit.service';

@Component({
    selector: 'jhi-gear-ambit-delete-dialog',
    templateUrl: './gear-ambit-delete-dialog.component.html'
})
export class GearAmbitDeleteDialogComponent {
    gearAmbit: IGearAmbit;

    constructor(private gearAmbitService: GearAmbitService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearAmbitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearAmbitListModification',
                content: 'Deleted an gearAmbit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-ambit-delete-popup',
    template: ''
})
export class GearAmbitDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearAmbit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearAmbitDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearAmbit = gearAmbit;
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
