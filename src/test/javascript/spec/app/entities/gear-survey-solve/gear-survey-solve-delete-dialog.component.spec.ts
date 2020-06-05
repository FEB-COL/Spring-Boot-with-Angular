/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveySolveDeleteDialogComponent } from 'app/entities/gear-survey-solve/gear-survey-solve-delete-dialog.component';
import { GearSurveySolveService } from 'app/entities/gear-survey-solve/gear-survey-solve.service';

describe('Component Tests', () => {
    describe('GearSurveySolve Management Delete Component', () => {
        let comp: GearSurveySolveDeleteDialogComponent;
        let fixture: ComponentFixture<GearSurveySolveDeleteDialogComponent>;
        let service: GearSurveySolveService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveySolveDeleteDialogComponent]
            })
                .overrideTemplate(GearSurveySolveDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveySolveDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveySolveService);
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
