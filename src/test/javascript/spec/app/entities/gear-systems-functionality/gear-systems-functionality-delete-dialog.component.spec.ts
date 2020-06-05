/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSystemsFunctionalityDeleteDialogComponent } from 'app/entities/gear-systems-functionality/gear-systems-functionality-delete-dialog.component';
import { GearSystemsFunctionalityService } from 'app/entities/gear-systems-functionality/gear-systems-functionality.service';

describe('Component Tests', () => {
    describe('GearSystemsFunctionality Management Delete Component', () => {
        let comp: GearSystemsFunctionalityDeleteDialogComponent;
        let fixture: ComponentFixture<GearSystemsFunctionalityDeleteDialogComponent>;
        let service: GearSystemsFunctionalityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSystemsFunctionalityDeleteDialogComponent]
            })
                .overrideTemplate(GearSystemsFunctionalityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSystemsFunctionalityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSystemsFunctionalityService);
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
