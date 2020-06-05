/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSmartStrategyAEDeleteDialogComponent } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae-delete-dialog.component';
import { GearSmartStrategyAEService } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae.service';

describe('Component Tests', () => {
    describe('GearSmartStrategyAE Management Delete Component', () => {
        let comp: GearSmartStrategyAEDeleteDialogComponent;
        let fixture: ComponentFixture<GearSmartStrategyAEDeleteDialogComponent>;
        let service: GearSmartStrategyAEService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSmartStrategyAEDeleteDialogComponent]
            })
                .overrideTemplate(GearSmartStrategyAEDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSmartStrategyAEDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSmartStrategyAEService);
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
