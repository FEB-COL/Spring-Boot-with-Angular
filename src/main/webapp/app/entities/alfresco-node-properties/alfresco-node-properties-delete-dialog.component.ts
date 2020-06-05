import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';
import { AlfrescoNodePropertiesService } from './alfresco-node-properties.service';

@Component({
    selector: 'jhi-alfresco-node-properties-delete-dialog',
    templateUrl: './alfresco-node-properties-delete-dialog.component.html'
})
export class AlfrescoNodePropertiesDeleteDialogComponent {
    alfrescoNodeProperties: IAlfrescoNodeProperties;

    constructor(
        private alfrescoNodePropertiesService: AlfrescoNodePropertiesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alfrescoNodePropertiesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alfrescoNodePropertiesListModification',
                content: 'Deleted an alfrescoNodeProperties'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alfresco-node-properties-delete-popup',
    template: ''
})
export class AlfrescoNodePropertiesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alfrescoNodeProperties }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AlfrescoNodePropertiesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.alfrescoNodeProperties = alfrescoNodeProperties;
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
