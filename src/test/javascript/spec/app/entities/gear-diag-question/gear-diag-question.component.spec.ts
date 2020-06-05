/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagQuestionComponent } from 'app/entities/gear-diag-question/gear-diag-question.component';
import { GearDiagQuestionService } from 'app/entities/gear-diag-question/gear-diag-question.service';
import { GearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

describe('Component Tests', () => {
    describe('GearDiagQuestion Management Component', () => {
        let comp: GearDiagQuestionComponent;
        let fixture: ComponentFixture<GearDiagQuestionComponent>;
        let service: GearDiagQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagQuestionComponent],
                providers: []
            })
                .overrideTemplate(GearDiagQuestionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagQuestionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagQuestionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDiagQuestion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDiagQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
