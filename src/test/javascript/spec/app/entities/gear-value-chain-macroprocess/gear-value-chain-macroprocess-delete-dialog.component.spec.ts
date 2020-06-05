/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainMacroprocessDeleteDialogComponent } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess-delete-dialog.component';
import { GearValueChainMacroprocessService } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess.service';

describe('Component Tests', () => {
    describe('GearValueChainMacroprocess Management Delete Component', () => {
        let comp: GearValueChainMacroprocessDeleteDialogComponent;
        let fixture: ComponentFixture<GearValueChainMacroprocessDeleteDialogComponent>;
        let service: GearValueChainMacroprocessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainMacroprocessDeleteDialogComponent]
            })
                .overrideTemplate(GearValueChainMacroprocessDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainMacroprocessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainMacroprocessService);
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
