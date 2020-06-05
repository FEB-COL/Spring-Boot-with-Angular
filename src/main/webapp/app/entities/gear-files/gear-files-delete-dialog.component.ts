import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearFiles } from 'app/shared/model/gear-files.model';
import { GearFilesService } from './gear-files.service';

@Component({
    selector: 'jhi-gear-files-delete-dialog',
    templateUrl: './gear-files-delete-dialog.component.html'
})
export class GearFilesDeleteDialogComponent {
    gearFiles: IGearFiles;

    constructor(private gearFilesService: GearFilesService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearFilesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearFilesListModification',
                content: 'Deleted an gearFiles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-files-delete-popup',
    template: ''
})
export class GearFilesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearFiles }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearFilesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearFiles = gearFiles;
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
