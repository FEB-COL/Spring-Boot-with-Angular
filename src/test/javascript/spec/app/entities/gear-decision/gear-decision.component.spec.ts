/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDecisionComponent } from 'app/entities/gear-decision/gear-decision.component';
import { GearDecisionService } from 'app/entities/gear-decision/gear-decision.service';
import { GearDecision } from 'app/shared/model/gear-decision.model';

describe('Component Tests', () => {
    describe('GearDecision Management Component', () => {
        let comp: GearDecisionComponent;
        let fixture: ComponentFixture<GearDecisionComponent>;
        let service: GearDecisionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDecisionComponent],
                providers: []
            })
                .overrideTemplate(GearDecisionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDecisionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDecisionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDecision(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDecisions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
