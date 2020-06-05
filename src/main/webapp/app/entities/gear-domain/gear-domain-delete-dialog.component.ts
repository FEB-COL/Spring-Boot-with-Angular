import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from './gear-domain.service';

@Component({
    selector: 'jhi-gear-domain-delete-dialog',
    templateUrl: './gear-domain-delete-dialog.component.html'
})
export class GearDomainDeleteDialogComponent {
    gearDomain: IGearDomain;

    constructor(private gearDomainService: GearDomainService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearDomainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearDomainListModification',
                content: 'Deleted an gearDomain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-domain-delete-popup',
    template: ''
})
export class GearDomainDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDomain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearDomainDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearDomain = gearDomain;
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
