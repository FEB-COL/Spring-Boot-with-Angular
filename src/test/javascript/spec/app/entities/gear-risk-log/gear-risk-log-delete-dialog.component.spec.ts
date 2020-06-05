/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearRiskLogDeleteDialogComponent } from 'app/entities/gear-risk-log/gear-risk-log-delete-dialog.component';
import { GearRiskLogService } from 'app/entities/gear-risk-log/gear-risk-log.service';

describe('Component Tests', () => {
    describe('GearRiskLog Management Delete Component', () => {
        let comp: GearRiskLogDeleteDialogComponent;
        let fixture: ComponentFixture<GearRiskLogDeleteDialogComponent>;
        let service: GearRiskLogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearRiskLogDeleteDialogComponent]
            })
                .overrideTemplate(GearRiskLogDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearRiskLogDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearRiskLogService);
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
