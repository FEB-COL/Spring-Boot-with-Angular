/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSystemsFunctionalityUpdateComponent } from 'app/entities/gear-systems-functionality/gear-systems-functionality-update.component';
import { GearSystemsFunctionalityService } from 'app/entities/gear-systems-functionality/gear-systems-functionality.service';
import { GearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';

describe('Component Tests', () => {
    describe('GearSystemsFunctionality Management Update Component', () => {
        let comp: GearSystemsFunctionalityUpdateComponent;
        let fixture: ComponentFixture<GearSystemsFunctionalityUpdateComponent>;
        let service: GearSystemsFunctionalityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSystemsFunctionalityUpdateComponent]
            })
                .overrideTemplate(GearSystemsFunctionalityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSystemsFunctionalityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSystemsFunctionalityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSystemsFunctionality(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSystemsFunctionality = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearSystemsFunctionality();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearSystemsFunctionality = entity;
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
