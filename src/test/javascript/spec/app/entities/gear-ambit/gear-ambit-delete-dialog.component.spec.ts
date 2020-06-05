/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearAmbitDeleteDialogComponent } from 'app/entities/gear-ambit/gear-ambit-delete-dialog.component';
import { GearAmbitService } from 'app/entities/gear-ambit/gear-ambit.service';

describe('Component Tests', () => {
    describe('GearAmbit Management Delete Component', () => {
        let comp: GearAmbitDeleteDialogComponent;
        let fixture: ComponentFixture<GearAmbitDeleteDialogComponent>;
        let service: GearAmbitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearAmbitDeleteDialogComponent]
            })
                .overrideTemplate(GearAmbitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearAmbitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearAmbitService);
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
