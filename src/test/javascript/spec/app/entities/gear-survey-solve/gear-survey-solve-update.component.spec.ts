/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveySolveUpdateComponent } from 'app/entities/gear-survey-solve/gear-survey-solve-update.component';
import { GearSurveySolveService } from 'app/entities/gear-survey-solve/gear-survey-solve.service';
import { GearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

describe('Component Tests', () => {
    describe('GearSurveySolve Management Update Component', () => {
        let comp: GearSurveySolveUpdateComponent;
        let fixture: ComponentFixture<GearSurveySolveUpdateComponent>;
        let service: GearSurveySolveService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveySolveUpdateComponent]
            })
                .overrideTemplate(GearSurveySolveUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveySolveUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveySolveService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveySolve(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveySolve = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveySolve();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveySolve = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
