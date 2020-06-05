/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { ParCoinTypeUpdateComponent } from 'app/entities/par-coin-type/par-coin-type-update.component';
import { ParCoinTypeService } from 'app/entities/par-coin-type/par-coin-type.service';
import { ParCoinType } from 'app/shared/model/par-coin-type.model';

describe('Component Tests', () => {
    describe('ParCoinType Management Update Component', () => {
        let comp: ParCoinTypeUpdateComponent;
        let fixture: ComponentFixture<ParCoinTypeUpdateComponent>;
        let service: ParCoinTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParCoinTypeUpdateComponent]
            })
                .overrideTemplate(ParCoinTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParCoinTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParCoinTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ParCoinType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parCoinType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ParCoinType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parCoinType = entity;
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
