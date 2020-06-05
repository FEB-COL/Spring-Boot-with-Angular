/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainCategoryDeleteDialogComponent } from 'app/entities/gear-value-chain-category/gear-value-chain-category-delete-dialog.component';
import { GearValueChainCategoryService } from 'app/entities/gear-value-chain-category/gear-value-chain-category.service';

describe('Component Tests', () => {
    describe('GearValueChainCategory Management Delete Component', () => {
        let comp: GearValueChainCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<GearValueChainCategoryDeleteDialogComponent>;
        let service: GearValueChainCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainCategoryDeleteDialogComponent]
            })
                .overrideTemplate(GearValueChainCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainCategoryService);
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
