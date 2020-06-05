/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearGoalsStrategyAEComponent } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae.component';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae.service';
import { GearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearGoalsStrategyAE Management Component', () => {
        let comp: GearGoalsStrategyAEComponent;
        let fixture: ComponentFixture<GearGoalsStrategyAEComponent>;
        let service: GearGoalsStrategyAEService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearGoalsStrategyAEComponent],
                providers: []
            })
                .overrideTemplate(GearGoalsStrategyAEComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearGoalsStrategyAEComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearGoalsStrategyAEService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearGoalsStrategyAE(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.strategyByUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
