/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearInformationSystemsUpdateComponent } from 'app/entities/gear-information-systems/gear-information-systems-update.component';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems/gear-information-systems.service';
import { GearInformationSystems } from 'app/shared/model/gear-information-systems.model';

describe('Component Tests', () => {
    describe('GearInformationSystems Management Update Component', () => {
        let comp: GearInformationSystemsUpdateComponent;
        let fixture: ComponentFixture<GearInformationSystemsUpdateComponent>;
        let service: GearInformationSystemsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearInformationSystemsUpdateComponent]
            })
                .overrideTemplate(GearInformationSystemsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearInformationSystemsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearInformationSystemsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearInformationSystems(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearInformationSystems = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearInformationSystems();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearInformationSystems = entity;
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
