/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagAnswerComponent } from 'app/entities/gear-diag-answer/gear-diag-answer.component';
import { GearDiagAnswerService } from 'app/entities/gear-diag-answer/gear-diag-answer.service';
import { GearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

describe('Component Tests', () => {
    describe('GearDiagAnswer Management Component', () => {
        let comp: GearDiagAnswerComponent;
        let fixture: ComponentFixture<GearDiagAnswerComponent>;
        let service: GearDiagAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagAnswerComponent],
                providers: []
            })
                .overrideTemplate(GearDiagAnswerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagAnswerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagAnswerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDiagAnswer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDiagAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
