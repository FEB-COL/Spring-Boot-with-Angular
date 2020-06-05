/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSmartStrategyAEUpdateComponent } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae-update.component';
import { GearSmartStrategyAEService } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae.service';
import { GearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearSmartStrategyAE Management Update Component', () => {
        let comp: GearSmartStrategyAEUpdateComponent;
        let fixture: ComponentFixture<GearSmartStrategyAEUpdateComponent>;
        let service: GearSmartStrategyAEService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSmartStrategyAEUpdateComponent]
            })
                .overrideTemplate(GearSmartStrategyAEUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSmartStrategyAEUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSmartStrategyAEService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSmartStrategyAE(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSmartStrategyAE = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSmartStrategyAE();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSmartStrategyAE = entity;
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
