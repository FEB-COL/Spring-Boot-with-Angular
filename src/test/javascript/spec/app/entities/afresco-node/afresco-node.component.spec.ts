/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { AfrescoNodeComponent } from 'app/entities/afresco-node/afresco-node.component';
import { AfrescoNodeService } from 'app/entities/afresco-node/afresco-node.service';
import { AfrescoNode } from 'app/shared/model/afresco-node.model';

describe('Component Tests', () => {
    describe('AfrescoNode Management Component', () => {
        let comp: AfrescoNodeComponent;
        let fixture: ComponentFixture<AfrescoNodeComponent>;
        let service: AfrescoNodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [AfrescoNodeComponent],
                providers: []
            })
                .overrideTemplate(AfrescoNodeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AfrescoNodeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AfrescoNodeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AfrescoNode(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.afrescoNodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
