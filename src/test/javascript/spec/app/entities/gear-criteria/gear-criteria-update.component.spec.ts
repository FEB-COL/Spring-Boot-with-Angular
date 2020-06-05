/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCriteriaUpdateComponent } from 'app/entities/gear-criteria/gear-criteria-update.component';
import { GearCriteriaService } from 'app/entities/gear-criteria/gear-criteria.service';
import { GearCriteria } from 'app/shared/model/gear-criteria.model';

describe('Component Tests', () => {
    describe('GearCriteria Management Update Component', () => {
        let comp: GearCriteriaUpdateComponent;
        let fixture: ComponentFixture<GearCriteriaUpdateComponent>;
        let service: GearCriteriaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCriteriaUpdateComponent]
            })
                .overrideTemplate(GearCriteriaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearCriteriaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCriteriaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearCriteria(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearCriteria = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearCriteria();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearCriteria = entity;
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
