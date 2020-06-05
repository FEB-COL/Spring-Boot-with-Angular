import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAfrescoNode } from 'app/shared/model/afresco-node.model';
import { AfrescoNodeService } from './afresco-node.service';

@Component({
    selector: 'jhi-afresco-node-delete-dialog',
    templateUrl: './afresco-node-delete-dialog.component.html'
})
export class AfrescoNodeDeleteDialogComponent {
    afrescoNode: IAfrescoNode;

    constructor(
        private afrescoNodeService: AfrescoNodeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.afrescoNodeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'afrescoNodeListModification',
                content: 'Deleted an afrescoNode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-afresco-node-delete-popup',
    template: ''
})
export class AfrescoNodeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ afrescoNode }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AfrescoNodeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.afrescoNode = afrescoNode;
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
