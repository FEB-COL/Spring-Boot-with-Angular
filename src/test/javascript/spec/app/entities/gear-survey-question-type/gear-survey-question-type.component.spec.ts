/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyQuestionTypeComponent } from 'app/entities/gear-survey-question-type/gear-survey-question-type.component';
import { GearSurveyQuestionTypeService } from 'app/entities/gear-survey-question-type/gear-survey-question-type.service';
import { GearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

describe('Component Tests', () => {
    describe('GearSurveyQuestionType Management Component', () => {
        let comp: GearSurveyQuestionTypeComponent;
        let fixture: ComponentFixture<GearSurveyQuestionTypeComponent>;
        let service: GearSurveyQuestionTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyQuestionTypeComponent],
                providers: []
            })
                .overrideTemplate(GearSurveyQuestionTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyQuestionTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyQuestionTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSurveyQuestionType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSurveyQuestionTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
