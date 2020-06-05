/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearInformationSystemsDeleteDialogComponent } from 'app/entities/gear-information-systems/gear-information-systems-delete-dialog.component';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems/gear-information-systems.service';

describe('Component Tests', () => {
    describe('GearInformationSystems Management Delete Component', () => {
        let comp: GearInformationSystemsDeleteDialogComponent;
        let fixture: ComponentFixture<GearInformationSystemsDeleteDialogComponent>;
        let service: GearInformationSystemsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearInformationSystemsDeleteDialogComponent]
            })
                .overrideTemplate(GearInformationSystemsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearInformationSystemsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearInformationSystemsService);
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
