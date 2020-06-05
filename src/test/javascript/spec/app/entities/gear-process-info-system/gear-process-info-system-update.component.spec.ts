/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProcessInfoSystemUpdateComponent } from 'app/entities/gear-process-info-system/gear-process-info-system-update.component';
import { GearProcessInfoSystemService } from 'app/entities/gear-process-info-system/gear-process-info-system.service';
import { GearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

describe('Component Tests', () => {
    describe('GearProcessInfoSystem Management Update Component', () => {
        let comp: GearProcessInfoSystemUpdateComponent;
        let fixture: ComponentFixture<GearProcessInfoSystemUpdateComponent>;
        let service: GearProcessInfoSystemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProcessInfoSystemUpdateComponent]
            })
                .overrideTemplate(GearProcessInfoSystemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProcessInfoSystemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProcessInfoSystemService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProcessInfoSystem(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProcessInfoSystem = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProcessInfoSystem();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProcessInfoSystem = entity;
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
