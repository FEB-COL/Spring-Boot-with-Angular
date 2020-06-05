/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectRiskDetailComponent } from 'app/entities/gear-project-risk/gear-project-risk-detail.component';
import { GearProjectRisk } from 'app/shared/model/gear-project-risk.model';

describe('Component Tests', () => {
    describe('GearProjectRisk Management Detail Component', () => {
        let comp: GearProjectRiskDetailComponent;
        let fixture: ComponentFixture<GearProjectRiskDetailComponent>;
        const route = ({ data: of({ gearProjectRisk: new GearProjectRisk(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectRiskDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearProjectRiskDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearProjectRiskDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearProjectRisk).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
