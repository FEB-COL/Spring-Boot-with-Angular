/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeargatewayTestModule } from '../../../test.module';
import { GearWikiDeleteDialogComponent } from 'app/entities/gear-wiki/gear-wiki-delete-dialog.component';
import { GearWikiService } from 'app/entities/gear-wiki/gear-wiki.service';

describe('Component Tests', () => {
    describe('GearWiki Management Delete Component', () => {
        let comp: GearWikiDeleteDialogComponent;
        let fixture: ComponentFixture<GearWikiDeleteDialogComponent>;
        let service: GearWikiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearWikiDeleteDialogComponent]
            })
                .overrideTemplate(GearWikiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearWikiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearWikiService);
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
