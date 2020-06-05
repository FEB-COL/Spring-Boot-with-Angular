/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { AlfrescoSiteDetailComponent } from 'app/entities/alfresco-site/alfresco-site-detail.component';
import { AlfrescoSite } from 'app/shared/model/alfresco-site.model';

describe('Component Tests', () => {
    describe('AlfrescoSite Management Detail Component', () => {
        let comp: AlfrescoSiteDetailComponent;
        let fixture: ComponentFixture<AlfrescoSiteDetailComponent>;
        const route = ({ data: of({ alfrescoSite: new AlfrescoSite(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AlfrescoSiteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AlfrescoSiteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AlfrescoSiteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.alfrescoSite).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
