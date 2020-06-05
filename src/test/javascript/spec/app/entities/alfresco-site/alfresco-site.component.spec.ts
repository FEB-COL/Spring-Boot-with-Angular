/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { AlfrescoSiteComponent } from 'app/entities/alfresco-site/alfresco-site.component';
import { AlfrescoSiteService } from 'app/entities/alfresco-site/alfresco-site.service';
import { AlfrescoSite } from 'app/shared/model/alfresco-site.model';

describe('Component Tests', () => {
    describe('AlfrescoSite Management Component', () => {
        let comp: AlfrescoSiteComponent;
        let fixture: ComponentFixture<AlfrescoSiteComponent>;
        let service: AlfrescoSiteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AlfrescoSiteComponent],
                providers: []
            })
                .overrideTemplate(AlfrescoSiteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AlfrescoSiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlfrescoSiteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AlfrescoSite(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.alfrescoSites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
