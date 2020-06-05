/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyAnswerUpdateComponent } from 'app/entities/gear-survey-answer/gear-survey-answer-update.component';
import { GearSurveyAnswerService } from 'app/entities/gear-survey-answer/gear-survey-answer.service';
import { GearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

describe('Component Tests', () => {
    describe('GearSurveyAnswer Management Update Component', () => {
        let comp: GearSurveyAnswerUpdateComponent;
        let fixture: ComponentFixture<GearSurveyAnswerUpdateComponent>;
        let service: GearSurveyAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyAnswerUpdateComponent]
            })
                .overrideTemplate(GearSurveyAnswerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyAnswerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyAnswerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyAnswer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyAnswer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyAnswer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyAnswer = entity;
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
