/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { AlfrescoNodePropertiesUpdateComponent } from 'app/entities/alfresco-node-properties/alfresco-node-properties-update.component';
import { AlfrescoNodePropertiesService } from 'app/entities/alfresco-node-properties/alfresco-node-properties.service';
import { AlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

describe('Component Tests', () => {
    describe('AlfrescoNodeProperties Management Update Component', () => {
        let comp: AlfrescoNodePropertiesUpdateComponent;
        let fixture: ComponentFixture<AlfrescoNodePropertiesUpdateComponent>;
        let service: AlfrescoNodePropertiesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AlfrescoNodePropertiesUpdateComponent]
            })
                .overrideTemplate(AlfrescoNodePropertiesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AlfrescoNodePropertiesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlfrescoNodePropertiesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AlfrescoNodeProperties(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.alfrescoNodeProperties = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AlfrescoNodeProperties();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.alfrescoNodeProperties = entity;
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
