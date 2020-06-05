/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDomainDeleteDialogComponent } from 'app/entities/gear-domain/gear-domain-delete-dialog.component';
import { GearDomainService } from 'app/entities/gear-domain/gear-domain.service';

describe('Component Tests', () => {
    describe('GearDomain Management Delete Component', () => {
        let comp: GearDomainDeleteDialogComponent;
        let fixture: ComponentFixture<GearDomainDeleteDialogComponent>;
        let service: GearDomainService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDomainDeleteDialogComponent]
            })
                .overrideTemplate(GearDomainDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDomainDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDomainService);
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
