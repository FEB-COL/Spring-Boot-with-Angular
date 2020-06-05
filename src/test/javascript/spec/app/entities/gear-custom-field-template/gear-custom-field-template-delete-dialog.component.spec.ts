/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCustomFieldTemplateDeleteDialogComponent } from 'app/entities/gear-custom-field-template/gear-custom-field-template-delete-dialog.component';
import { GearCustomFieldTemplateService } from 'app/entities/gear-custom-field-template/gear-custom-field-template.service';

describe('Component Tests', () => {
    describe('GearCustomFieldTemplate Management Delete Component', () => {
        let comp: GearCustomFieldTemplateDeleteDialogComponent;
        let fixture: ComponentFixture<GearCustomFieldTemplateDeleteDialogComponent>;
        let service: GearCustomFieldTemplateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCustomFieldTemplateDeleteDialogComponent]
            })
                .overrideTemplate(GearCustomFieldTemplateDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearCustomFieldTemplateDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCustomFieldTemplateService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
