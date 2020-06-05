import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';
import { AlfrescoSiteService } from './alfresco-site.service';

@Component({
    selector: 'jhi-alfresco-site-delete-dialog',
    templateUrl: './alfresco-site-delete-dialog.component.html'
})
export class AlfrescoSiteDeleteDialogComponent {
    alfrescoSite: IAlfrescoSite;

    constructor(
        private alfrescoSiteService: AlfrescoSiteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alfrescoSiteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alfrescoSiteListModification',
                content: 'Deleted an alfrescoSite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alfresco-site-delete-popup',
    template: ''
})
export class AlfrescoSiteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alfrescoSite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AlfrescoSiteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.alfrescoSite = alfrescoSite;
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
