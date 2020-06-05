/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOrganizationalUnitUpdateComponent } from 'app/entities/gear-organizational-unit/gear-organizational-unit-update.component';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit/gear-organizational-unit.service';
import { GearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

describe('Component Tests', () => {
    describe('GearOrganizationalUnit Management Update Component', () => {
        let comp: GearOrganizationalUnitUpdateComponent;
        let fixture: ComponentFixture<GearOrganizationalUnitUpdateComponent>;
        let service: GearOrganizationalUnitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOrganizationalUnitUpdateComponent]
            })
                .overrideTemplate(GearOrganizationalUnitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearOrganizationalUnitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearOrganizationalUnitService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearOrganizationalUnit(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearOrganizationalUnit = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearOrganizationalUnit();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearOrganizationalUnit = entity;
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
