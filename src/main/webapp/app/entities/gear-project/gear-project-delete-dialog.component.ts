import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearProjectService } from './gear-project.service';

@Component({
    selector: 'jhi-gear-project-delete-dialog',
    templateUrl: './gear-project-delete-dialog.component.html'
})
export class GearProjectDeleteDialogComponent {
    gearProject: IGearProject;

    constructor(
        private gearProjectService: GearProjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearProjectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearProjectListModification',
                content: 'Deleted an gearProject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-project-delete-popup',
    template: ''
})
export class GearProjectDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProject }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearProjectDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearProject = gearProject;
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
