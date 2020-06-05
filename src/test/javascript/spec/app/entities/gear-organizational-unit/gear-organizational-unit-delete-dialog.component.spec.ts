/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOrganizationalUnitDeleteDialogComponent } from 'app/entities/gear-organizational-unit/gear-organizational-unit-delete-dialog.component';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit/gear-organizational-unit.service';

describe('Component Tests', () => {
    describe('GearOrganizationalUnit Management Delete Component', () => {
        let comp: GearOrganizationalUnitDeleteDialogComponent;
        let fixture: ComponentFixture<GearOrganizationalUnitDeleteDialogComponent>;
        let service: GearOrganizationalUnitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOrganizationalUnitDeleteDialogComponent]
            })
                .overrideTemplate(GearOrganizationalUnitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearOrganizationalUnitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearOrganizationalUnitService);
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
