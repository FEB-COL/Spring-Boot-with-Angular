/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { AfrescoNodeUpdateComponent } from 'app/entities/afresco-node/afresco-node-update.component';
import { AfrescoNodeService } from 'app/entities/afresco-node/afresco-node.service';
import { AfrescoNode } from 'app/shared/model/afresco-node.model';

describe('Component Tests', () => {
    describe('AfrescoNode Management Update Component', () => {
        let comp: AfrescoNodeUpdateComponent;
        let fixture: ComponentFixture<AfrescoNodeUpdateComponent>;
        let service: AfrescoNodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AfrescoNodeUpdateComponent]
            })
                .overrideTemplate(AfrescoNodeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AfrescoNodeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AfrescoNodeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AfrescoNode(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.afrescoNode = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AfrescoNode();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.afrescoNode = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
