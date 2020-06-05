/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearUserUpdateComponent } from 'app/entities/gear-user/gear-user-update.component';
import { GearUserService } from 'app/entities/gear-user/gear-user.service';
import { GearUser } from 'app/shared/model/gear-user.model';

describe('Component Tests', () => {
    describe('GearUser Management Update Component', () => {
        let comp: GearUserUpdateComponent;
        let fixture: ComponentFixture<GearUserUpdateComponent>;
        let service: GearUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearUserUpdateComponent]
            })
                .overrideTemplate(GearUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearUserService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearUser(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearUser = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearUser();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearUser = entity;
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
