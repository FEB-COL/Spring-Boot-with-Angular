/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagAnswerDeleteDialogComponent } from 'app/entities/gear-diag-answer/gear-diag-answer-delete-dialog.component';
import { GearDiagAnswerService } from 'app/entities/gear-diag-answer/gear-diag-answer.service';

describe('Component Tests', () => {
    describe('GearDiagAnswer Management Delete Component', () => {
        let comp: GearDiagAnswerDeleteDialogComponent;
        let fixture: ComponentFixture<GearDiagAnswerDeleteDialogComponent>;
        let service: GearDiagAnswerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagAnswerDeleteDialogComponent]
            })
                .overrideTemplate(GearDiagAnswerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagAnswerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagAnswerService);
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
