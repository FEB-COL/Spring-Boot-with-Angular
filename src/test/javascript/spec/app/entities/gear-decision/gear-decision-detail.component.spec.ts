/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDecisionDetailComponent } from 'app/entities/gear-decision/gear-decision-detail.component';
import { GearDecision } from 'app/shared/model/gear-decision.model';

describe('Component Tests', () => {
    describe('GearDecision Management Detail Component', () => {
        let comp: GearDecisionDetailComponent;
        let fixture: ComponentFixture<GearDecisionDetailComponent>;
        const route = ({ data: of({ gearDecision: new GearDecision(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDecisionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDecisionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDecisionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDecision).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
