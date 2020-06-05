/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisTypeDeleteDialogComponent } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type-delete-dialog.component';
import { GearDiagnosisTypeService } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type.service';

describe('Component Tests', () => {
    describe('GearDiagnosisType Management Delete Component', () => {
        let comp: GearDiagnosisTypeDeleteDialogComponent;
        let fixture: ComponentFixture<GearDiagnosisTypeDeleteDialogComponent>;
        let service: GearDiagnosisTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisTypeDeleteDialogComponent]
            })
                .overrideTemplate(GearDiagnosisTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagnosisTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisTypeService);
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
