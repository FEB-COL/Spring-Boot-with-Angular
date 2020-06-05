/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagAnswerDetailComponent } from 'app/entities/gear-diag-answer/gear-diag-answer-detail.component';
import { GearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

describe('Component Tests', () => {
    describe('GearDiagAnswer Management Detail Component', () => {
        let comp: GearDiagAnswerDetailComponent;
        let fixture: ComponentFixture<GearDiagAnswerDetailComponent>;
        const route = ({ data: of({ gearDiagAnswer: new GearDiagAnswer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagAnswerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDiagAnswerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagAnswerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDiagAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
