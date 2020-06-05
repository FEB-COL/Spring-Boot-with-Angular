/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { AfrescoNodeDetailComponent } from 'app/entities/afresco-node/afresco-node-detail.component';
import { AfrescoNode } from 'app/shared/model/afresco-node.model';

describe('Component Tests', () => {
    describe('AfrescoNode Management Detail Component', () => {
        let comp: AfrescoNodeDetailComponent;
        let fixture: ComponentFixture<AfrescoNodeDetailComponent>;
        const route = ({ data: of({ afrescoNode: new AfrescoNode(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AfrescoNodeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AfrescoNodeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AfrescoNodeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.afrescoNode).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
