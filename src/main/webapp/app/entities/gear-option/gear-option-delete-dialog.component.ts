import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearOption } from 'app/shared/model/gear-option.model';
import { GearOptionService } from './gear-option.service';

@Component({
    selector: 'jhi-gear-option-delete-dialog',
    templateUrl: './gear-option-delete-dialog.component.html'
})
export class GearOptionDeleteDialogComponent {
    gearOption: IGearOption;

    constructor(private gearOptionService: GearOptionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearOptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearOptionListModification',
                content: 'Deleted an gearOption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-option-delete-popup',
    template: ''
})
export class GearOptionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearOption }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearOptionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearOption = gearOption;
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
