/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagQuestionDetailComponent } from 'app/entities/gear-diag-question/gear-diag-question-detail.component';
import { GearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

describe('Component Tests', () => {
    describe('GearDiagQuestion Management Detail Component', () => {
        let comp: GearDiagQuestionDetailComponent;
        let fixture: ComponentFixture<GearDiagQuestionDetailComponent>;
        const route = ({ data: of({ gearDiagQuestion: new GearDiagQuestion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagQuestionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDiagQuestionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagQuestionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDiagQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
