/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisDeleteDialogComponent } from 'app/entities/gear-diagnosis/gear-diagnosis-delete-dialog.component';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis/gear-diagnosis.service';

describe('Component Tests', () => {
    describe('GearDiagnosis Management Delete Component', () => {
        let comp: GearDiagnosisDeleteDialogComponent;
        let fixture: ComponentFixture<GearDiagnosisDeleteDialogComponent>;
        let service: GearDiagnosisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisDeleteDialogComponent]
            })
                .overrideTemplate(GearDiagnosisDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagnosisDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisService);
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
