/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { AlfrescoNodePropertiesDetailComponent } from 'app/entities/alfresco-node-properties/alfresco-node-properties-detail.component';
import { AlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

describe('Component Tests', () => {
    describe('AlfrescoNodeProperties Management Detail Component', () => {
        let comp: AlfrescoNodePropertiesDetailComponent;
        let fixture: ComponentFixture<AlfrescoNodePropertiesDetailComponent>;
        const route = ({ data: of({ alfrescoNodeProperties: new AlfrescoNodeProperties(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AlfrescoNodePropertiesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AlfrescoNodePropertiesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AlfrescoNodePropertiesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.alfrescoNodeProperties).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
