/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionComponent } from 'app/entities/gear-survey-question/gear-survey-question.component';
import { GearSurveyQuestionService } from 'app/entities/gear-survey-question/gear-survey-question.service';
import { GearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestion Management Component', () => {
        let comp: GearSurveyQuestionComponent;
        let fixture: ComponentFixture<GearSurveyQuestionComponent>;
        let service: GearSurveyQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionComponent],
                providers: []
            })
                .overrideTemplate(GearSurveyQuestionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyQuestionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyQuestionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSurveyQuestion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSurveyQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
