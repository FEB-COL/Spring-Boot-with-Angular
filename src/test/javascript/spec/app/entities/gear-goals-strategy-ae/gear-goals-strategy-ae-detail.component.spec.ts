/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearGoalsStrategyAEDetailComponent } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae-detail.component';
import { GearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearGoalsStrategyAE Management Detail Component', () => {
        let comp: GearGoalsStrategyAEDetailComponent;
        let fixture: ComponentFixture<GearGoalsStrategyAEDetailComponent>;
        const route = ({ data: of({ gearGoalsStrategyAE: new GearGoalsStrategyAE(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearGoalsStrategyAEDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearGoalsStrategyAEDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearGoalsStrategyAEDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearGoalsStrategyAE).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
