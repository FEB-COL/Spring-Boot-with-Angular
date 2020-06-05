/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { ParSystemTypeDeleteDialogComponent } from 'app/entities/par-system-type/par-system-type-delete-dialog.component';
import { ParSystemTypeService } from 'app/entities/par-system-type/par-system-type.service';

describe('Component Tests', () => {
    describe('ParSystemType Management Delete Component', () => {
        let comp: ParSystemTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ParSystemTypeDeleteDialogComponent>;
        let service: ParSystemTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParSystemTypeDeleteDialogComponent]
            })
                .overrideTemplate(ParSystemTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParSystemTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParSystemTypeService);
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
