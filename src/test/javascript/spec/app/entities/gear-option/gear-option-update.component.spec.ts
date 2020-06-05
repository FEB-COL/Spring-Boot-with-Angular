/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOptionUpdateComponent } from 'app/entities/gear-option/gear-option-update.component';
import { GearOptionService } from 'app/entities/gear-option/gear-option.service';
import { GearOption } from 'app/shared/model/gear-option.model';

describe('Component Tests', () => {
    describe('GearOption Management Update Component', () => {
        let comp: GearOptionUpdateComponent;
        let fixture: ComponentFixture<GearOptionUpdateComponent>;
        let service: GearOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOptionUpdateComponent]
            })
                .overrideTemplate(GearOptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearOptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearOptionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearOption(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearOption = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearOption();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearOption = entity;
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
