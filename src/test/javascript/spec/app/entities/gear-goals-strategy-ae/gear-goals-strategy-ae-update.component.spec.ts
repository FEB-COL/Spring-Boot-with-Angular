/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearGoalsStrategyAEUpdateComponent } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae-update.component';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae.service';
import { GearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearGoalsStrategyAE Management Update Component', () => {
        let comp: GearGoalsStrategyAEUpdateComponent;
        let fixture: ComponentFixture<GearGoalsStrategyAEUpdateComponent>;
        let service: GearGoalsStrategyAEService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearGoalsStrategyAEUpdateComponent]
            })
                .overrideTemplate(GearGoalsStrategyAEUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearGoalsStrategyAEUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearGoalsStrategyAEService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearGoalsStrategyAE(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearGoalsStrategyAE = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearGoalsStrategyAE();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearGoalsStrategyAE = entity;
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
