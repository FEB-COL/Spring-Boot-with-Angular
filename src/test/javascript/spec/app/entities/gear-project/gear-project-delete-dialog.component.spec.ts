/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectDeleteDialogComponent } from 'app/entities/gear-project/gear-project-delete-dialog.component';
import { GearProjectService } from 'app/entities/gear-project/gear-project.service';

describe('Component Tests', () => {
    describe('GearProject Management Delete Component', () => {
        let comp: GearProjectDeleteDialogComponent;
        let fixture: ComponentFixture<GearProjectDeleteDialogComponent>;
        let service: GearProjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectDeleteDialogComponent]
            })
                .overrideTemplate(GearProjectDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearProjectDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProjectService);
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
