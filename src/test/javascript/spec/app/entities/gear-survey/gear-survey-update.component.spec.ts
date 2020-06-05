/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyUpdateComponent } from 'app/entities/gear-survey/gear-survey-update.component';
import { GearSurveyService } from 'app/entities/gear-survey/gear-survey.service';
import { GearSurvey } from 'app/shared/model/gear-survey.model';

describe('Component Tests', () => {
    describe('GearSurvey Management Update Component', () => {
        let comp: GearSurveyUpdateComponent;
        let fixture: ComponentFixture<GearSurveyUpdateComponent>;
        let service: GearSurveyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyUpdateComponent]
            })
                .overrideTemplate(GearSurveyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurvey(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurvey = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurvey();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurvey = entity;
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
