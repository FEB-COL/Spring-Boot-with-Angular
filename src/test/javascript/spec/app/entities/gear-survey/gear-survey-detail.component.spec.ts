/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSurveyDetailComponent } from 'app/entities/gear-survey/gear-survey-detail.component';
import { GearSurvey } from 'app/shared/model/gear-survey.model';

describe('Component Tests', () => {
    describe('GearSurvey Management Detail Component', () => {
        let comp: GearSurveyDetailComponent;
        let fixture: ComponentFixture<GearSurveyDetailComponent>;
        const route = ({ data: of({ gearSurvey: new GearSurvey(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSurveyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSurveyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSurveyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSurvey).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
