/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveySolveComponent } from 'app/entities/gear-survey-solve/gear-survey-solve.component';
import { GearSurveySolveService } from 'app/entities/gear-survey-solve/gear-survey-solve.service';
import { GearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

describe('Component Tests', () => {
    describe('GearSurveySolve Management Component', () => {
        let comp: GearSurveySolveComponent;
        let fixture: ComponentFixture<GearSurveySolveComponent>;
        let service: GearSurveySolveService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveySolveComponent],
                providers: []
            })
                .overrideTemplate(GearSurveySolveComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveySolveComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveySolveService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSurveySolve(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSurveySolves[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
