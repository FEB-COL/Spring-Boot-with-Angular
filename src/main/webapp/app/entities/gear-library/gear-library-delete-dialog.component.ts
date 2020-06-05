import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearLibrary } from 'app/shared/model/gear-library.model';
import { GearLibraryService } from './gear-library.service';

@Component({
    selector: 'jhi-gear-library-delete-dialog',
    templateUrl: './gear-library-delete-dialog.component.html'
})
export class GearLibraryDeleteDialogComponent {
    gearLibrary: IGearLibrary;

    constructor(
        private gearLibraryService: GearLibraryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearLibraryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearLibraryListModification',
                content: 'Deleted an gearLibrary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-library-delete-popup',
    template: ''
})
export class GearLibraryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearLibrary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearLibraryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearLibrary = gearLibrary;
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
