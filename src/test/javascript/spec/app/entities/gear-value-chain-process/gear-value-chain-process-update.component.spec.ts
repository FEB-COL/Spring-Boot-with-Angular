/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainProcessUpdateComponent } from 'app/entities/gear-value-chain-process/gear-value-chain-process-update.component';
import { GearValueChainProcessService } from 'app/entities/gear-value-chain-process/gear-value-chain-process.service';
import { GearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

describe('Component Tests', () => {
    describe('GearValueChainProcess Management Update Component', () => {
        let comp: GearValueChainProcessUpdateComponent;
        let fixture: ComponentFixture<GearValueChainProcessUpdateComponent>;
        let service: GearValueChainProcessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainProcessUpdateComponent]
            })
                .overrideTemplate(GearValueChainProcessUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainProcessUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainProcessService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainProcess(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainProcess = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainProcess();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainProcess = entity;
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
