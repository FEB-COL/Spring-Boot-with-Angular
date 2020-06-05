/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { AlfrescoNodePropertiesComponent } from 'app/entities/alfresco-node-properties/alfresco-node-properties.component';
import { AlfrescoNodePropertiesService } from 'app/entities/alfresco-node-properties/alfresco-node-properties.service';
import { AlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

describe('Component Tests', () => {
    describe('AlfrescoNodeProperties Management Component', () => {
        let comp: AlfrescoNodePropertiesComponent;
        let fixture: ComponentFixture<AlfrescoNodePropertiesComponent>;
        let service: AlfrescoNodePropertiesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AlfrescoNodePropertiesComponent],
                providers: []
            })
                .overrideTemplate(AlfrescoNodePropertiesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AlfrescoNodePropertiesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlfrescoNodePropertiesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AlfrescoNodeProperties(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.alfrescoNodeProperties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
