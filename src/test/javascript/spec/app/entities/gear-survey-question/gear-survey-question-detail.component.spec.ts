/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionDetailComponent } from 'app/entities/gear-survey-question/gear-survey-question-detail.component';
import { GearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestion Management Detail Component', () => {
        let comp: GearSurveyQuestionDetailComponent;
        let fixture: ComponentFixture<GearSurveyQuestionDetailComponent>;
        const route = ({ data: of({ gearSurveyQuestion: new GearSurveyQuestion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSurveyQuestionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveyQuestionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSurveyQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
