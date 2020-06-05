/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDecisionUpdateComponent } from 'app/entities/gear-decision/gear-decision-update.component';
import { GearDecisionService } from 'app/entities/gear-decision/gear-decision.service';
import { GearDecision } from 'app/shared/model/gear-decision.model';

describe('Component Tests', () => {
    describe('GearDecision Management Update Component', () => {
        let comp: GearDecisionUpdateComponent;
        let fixture: ComponentFixture<GearDecisionUpdateComponent>;
        let service: GearDecisionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDecisionUpdateComponent]
            })
                .overrideTemplate(GearDecisionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDecisionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDecisionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDecision(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDecision = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDecision();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDecision = entity;
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
