/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveySolveDetailComponent } from 'app/entities/gear-survey-solve/gear-survey-solve-detail.component';
import { GearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

describe('Component Tests', () => {
    describe('GearSurveySolve Management Detail Component', () => {
        let comp: GearSurveySolveDetailComponent;
        let fixture: ComponentFixture<GearSurveySolveDetailComponent>;
        const route = ({ data: of({ gearSurveySolve: new GearSurveySolve(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveySolveDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSurveySolveDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveySolveDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSurveySolve).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
