/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyAnswerDetailComponent } from 'app/entities/gear-survey-answer/gear-survey-answer-detail.component';
import { GearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

describe('Component Tests', () => {
    describe('GearSurveyAnswer Management Detail Component', () => {
        let comp: GearSurveyAnswerDetailComponent;
        let fixture: ComponentFixture<GearSurveyAnswerDetailComponent>;
        const route = ({ data: of({ gearSurveyAnswer: new GearSurveyAnswer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyAnswerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSurveyAnswerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveyAnswerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSurveyAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
