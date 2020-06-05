/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyAnswerComponent } from 'app/entities/gear-survey-answer/gear-survey-answer.component';
import { GearSurveyAnswerService } from 'app/entities/gear-survey-answer/gear-survey-answer.service';
import { GearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

describe('Component Tests', () => {
    describe('GearSurveyAnswer Management Component', () => {
        let comp: GearSurveyAnswerComponent;
        let fixture: ComponentFixture<GearSurveyAnswerComponent>;
        let service: GearSurveyAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyAnswerComponent],
                providers: []
            })
                .overrideTemplate(GearSurveyAnswerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyAnswerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyAnswerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSurveyAnswer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSurveyAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
