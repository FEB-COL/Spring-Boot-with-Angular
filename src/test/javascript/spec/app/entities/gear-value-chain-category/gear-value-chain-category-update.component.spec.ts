/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainCategoryUpdateComponent } from 'app/entities/gear-value-chain-category/gear-value-chain-category-update.component';
import { GearValueChainCategoryService } from 'app/entities/gear-value-chain-category/gear-value-chain-category.service';
import { GearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

describe('Component Tests', () => {
    describe('GearValueChainCategory Management Update Component', () => {
        let comp: GearValueChainCategoryUpdateComponent;
        let fixture: ComponentFixture<GearValueChainCategoryUpdateComponent>;
        let service: GearValueChainCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainCategoryUpdateComponent]
            })
                .overrideTemplate(GearValueChainCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainCategoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainCategory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainCategory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearValueChainCategory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearValueChainCategory = entity;
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
