/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionTypeDetailComponent } from 'app/entities/gear-survey-question-type/gear-survey-question-type-detail.component';
import { GearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestionType Management Detail Component', () => {
        let comp: GearSurveyQuestionTypeDetailComponent;
        let fixture: ComponentFixture<GearSurveyQuestionTypeDetailComponent>;
        const route = ({ data: of({ gearSurveyQuestionType: new GearSurveyQuestionType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSurveyQuestionTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveyQuestionTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSurveyQuestionType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
