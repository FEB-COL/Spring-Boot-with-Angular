/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProcessInfoSystemDeleteDialogComponent } from 'app/entities/gear-process-info-system/gear-process-info-system-delete-dialog.component';
import { GearProcessInfoSystemService } from 'app/entities/gear-process-info-system/gear-process-info-system.service';

describe('Component Tests', () => {
    describe('GearProcessInfoSystem Management Delete Component', () => {
        let comp: GearProcessInfoSystemDeleteDialogComponent;
        let fixture: ComponentFixture<GearProcessInfoSystemDeleteDialogComponent>;
        let service: GearProcessInfoSystemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProcessInfoSystemDeleteDialogComponent]
            })
                .overrideTemplate(GearProcessInfoSystemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearProcessInfoSystemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProcessInfoSystemService);
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
