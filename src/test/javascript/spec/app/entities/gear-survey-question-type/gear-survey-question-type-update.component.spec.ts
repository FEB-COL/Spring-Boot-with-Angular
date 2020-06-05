/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionTypeUpdateComponent } from 'app/entities/gear-survey-question-type/gear-survey-question-type-update.component';
import { GearSurveyQuestionTypeService } from 'app/entities/gear-survey-question-type/gear-survey-question-type.service';
import { GearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestionType Management Update Component', () => {
        let comp: GearSurveyQuestionTypeUpdateComponent;
        let fixture: ComponentFixture<GearSurveyQuestionTypeUpdateComponent>;
        let service: GearSurveyQuestionTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionTypeUpdateComponent]
            })
                .overrideTemplate(GearSurveyQuestionTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyQuestionTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyQuestionTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyQuestionType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyQuestionType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSurveyQuestionType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSurveyQuestionType = entity;
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
