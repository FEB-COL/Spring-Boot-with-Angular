/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCriteriaDeleteDialogComponent } from 'app/entities/gear-criteria/gear-criteria-delete-dialog.component';
import { GearCriteriaService } from 'app/entities/gear-criteria/gear-criteria.service';

describe('Component Tests', () => {
    describe('GearCriteria Management Delete Component', () => {
        let comp: GearCriteriaDeleteDialogComponent;
        let fixture: ComponentFixture<GearCriteriaDeleteDialogComponent>;
        let service: GearCriteriaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCriteriaDeleteDialogComponent]
            })
                .overrideTemplate(GearCriteriaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearCriteriaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCriteriaService);
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
