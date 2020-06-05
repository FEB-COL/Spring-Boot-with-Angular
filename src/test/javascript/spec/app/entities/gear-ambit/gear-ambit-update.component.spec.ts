/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearAmbitUpdateComponent } from 'app/entities/gear-ambit/gear-ambit-update.component';
import { GearAmbitService } from 'app/entities/gear-ambit/gear-ambit.service';
import { GearAmbit } from 'app/shared/model/gear-ambit.model';

describe('Component Tests', () => {
    describe('GearAmbit Management Update Component', () => {
        let comp: GearAmbitUpdateComponent;
        let fixture: ComponentFixture<GearAmbitUpdateComponent>;
        let service: GearAmbitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearAmbitUpdateComponent]
            })
                .overrideTemplate(GearAmbitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearAmbitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearAmbitService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearAmbit(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearAmbit = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearAmbit();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearAmbit = entity;
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
