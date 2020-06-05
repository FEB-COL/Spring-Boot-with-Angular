/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainProcessDeleteDialogComponent } from 'app/entities/gear-value-chain-process/gear-value-chain-process-delete-dialog.component';
import { GearValueChainProcessService } from 'app/entities/gear-value-chain-process/gear-value-chain-process.service';

describe('Component Tests', () => {
    describe('GearValueChainProcess Management Delete Component', () => {
        let comp: GearValueChainProcessDeleteDialogComponent;
        let fixture: ComponentFixture<GearValueChainProcessDeleteDialogComponent>;
        let service: GearValueChainProcessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainProcessDeleteDialogComponent]
            })
                .overrideTemplate(GearValueChainProcessDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainProcessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainProcessService);
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
