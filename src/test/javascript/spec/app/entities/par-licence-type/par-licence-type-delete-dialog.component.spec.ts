/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { ParLicenceTypeDeleteDialogComponent } from 'app/entities/par-licence-type/par-licence-type-delete-dialog.component';
import { ParLicenceTypeService } from 'app/entities/par-licence-type/par-licence-type.service';

describe('Component Tests', () => {
    describe('ParLicenceType Management Delete Component', () => {
        let comp: ParLicenceTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ParLicenceTypeDeleteDialogComponent>;
        let service: ParLicenceTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParLicenceTypeDeleteDialogComponent]
            })
                .overrideTemplate(ParLicenceTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParLicenceTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParLicenceTypeService);
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
