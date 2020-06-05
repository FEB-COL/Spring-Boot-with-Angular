/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearGoalsStrategyAEDeleteDialogComponent } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae-delete-dialog.component';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae.service';

describe('Component Tests', () => {
    describe('GearGoalsStrategyAE Management Delete Component', () => {
        let comp: GearGoalsStrategyAEDeleteDialogComponent;
        let fixture: ComponentFixture<GearGoalsStrategyAEDeleteDialogComponent>;
        let service: GearGoalsStrategyAEService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearGoalsStrategyAEDeleteDialogComponent]
            })
                .overrideTemplate(GearGoalsStrategyAEDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearGoalsStrategyAEDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearGoalsStrategyAEService);
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
