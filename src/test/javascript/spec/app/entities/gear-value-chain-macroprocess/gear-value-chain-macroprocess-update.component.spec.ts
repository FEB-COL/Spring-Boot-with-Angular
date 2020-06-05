/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainMacroprocessUpdateComponent } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess-update.component';
import { GearValueChainMacroprocessService } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess.service';
import { GearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

describe('Component Tests', () => {
    describe('GearValueChainMacroprocess Management Update Component', () => {
        let comp: GearValueChainMacroprocessUpdateComponent;
        let fixture: ComponentFixture<GearValueChainMacroprocessUpdateComponent>;
        let service: GearValueChainMacroprocessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainMacroprocessUpdateComponent]
            })
                .overrideTemplate(GearValueChainMacroprocessUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainMacroprocessUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainMacroprocessService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainMacroprocess(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainMacroprocess = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainMacroprocess();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainMacroprocess = entity;
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
