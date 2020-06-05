/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionUpdateComponent } from 'app/entities/gear-survey-question/gear-survey-question-update.component';
import { GearSurveyQuestionService } from 'app/entities/gear-survey-question/gear-survey-question.service';
import { GearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestion Management Update Component', () => {
        let comp: GearSurveyQuestionUpdateComponent;
        let fixture: ComponentFixture<GearSurveyQuestionUpdateComponent>;
        let service: GearSurveyQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionUpdateComponent]
            })
                .overrideTemplate(GearSurveyQuestionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyQuestionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyQuestionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyQuestion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyQuestion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyQuestion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyQuestion = entity;
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
