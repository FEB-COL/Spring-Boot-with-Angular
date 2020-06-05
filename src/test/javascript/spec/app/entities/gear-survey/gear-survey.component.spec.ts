/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyComponent } from 'app/entities/gear-survey/gear-survey.component';
import { GearSurveyService } from 'app/entities/gear-survey/gear-survey.service';
import { GearSurvey } from 'app/shared/model/gear-survey.model';

describe('Component Tests', () => {
    describe('GearSurvey Management Component', () => {
        let comp: GearSurveyComponent;
        let fixture: ComponentFixture<GearSurveyComponent>;
        let service: GearSurveyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyComponent],
                providers: []
            })
                .overrideTemplate(GearSurveyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSurveyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSurveyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSurvey(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSurveys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
