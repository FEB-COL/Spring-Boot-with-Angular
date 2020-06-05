/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagQuestionUpdateComponent } from 'app/entities/gear-diag-question/gear-diag-question-update.component';
import { GearDiagQuestionService } from 'app/entities/gear-diag-question/gear-diag-question.service';
import { GearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

describe('Component Tests', () => {
    describe('GearDiagQuestion Management Update Component', () => {
        let comp: GearDiagQuestionUpdateComponent;
        let fixture: ComponentFixture<GearDiagQuestionUpdateComponent>;
        let service: GearDiagQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagQuestionUpdateComponent]
            })
                .overrideTemplate(GearDiagQuestionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagQuestionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagQuestionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagQuestion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagQuestion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagQuestion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagQuestion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
