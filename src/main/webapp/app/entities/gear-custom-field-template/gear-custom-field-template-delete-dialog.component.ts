import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { GearCustomFieldTemplateService } from './gear-custom-field-template.service';

@Component({
    selector: 'jhi-gear-custom-field-template-delete-dialog',
    templateUrl: './gear-custom-field-template-delete-dialog.component.html'
})
export class GearCustomFieldTemplateDeleteDialogComponent {
    gearCustomFieldTemplate: IGearCustomFieldTemplate;

    constructor(
        private gearCustomFieldTemplateService: GearCustomFieldTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gearCustomFieldTemplateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gearCustomFieldTemplateListModification',
                content: 'Deleted an gearCustomFieldTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gear-custom-field-template-delete-popup',
    template: ''
})
export class GearCustomFieldTemplateDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearCustomFieldTemplate }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GearCustomFieldTemplateDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gearCustomFieldTemplate = gearCustomFieldTemplate;
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
