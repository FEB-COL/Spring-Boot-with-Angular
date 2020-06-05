import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearWiki } from 'app/shared/model/gear-wiki.model';
import { GearWikiService } from './gear-wiki.service';

@Component({
    selector: 'jhi-gear-wiki-delete-dialog',
    templateUrl: './gear-wiki-delete-dialog.component.html'
})
export class GearWikiDeleteDialogComponent {
    gearWiki: IGearWiki;

    constructor(private gearWikiService: GearWikiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearWikiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearWikiListModification',
                content: 'Deleted an gearWiki'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-wiki-delete-popup',
    template: ''
})
export class GearWikiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearWiki }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearWikiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gearWiki = gearWiki;
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
