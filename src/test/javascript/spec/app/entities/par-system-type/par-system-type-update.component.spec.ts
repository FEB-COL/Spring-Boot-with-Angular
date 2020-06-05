/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { ParSystemTypeUpdateComponent } from 'app/entities/par-system-type/par-system-type-update.component';
import { ParSystemTypeService } from 'app/entities/par-system-type/par-system-type.service';
import { ParSystemType } from 'app/shared/model/par-system-type.model';

describe('Component Tests', () => {
    describe('ParSystemType Management Update Component', () => {
        let comp: ParSystemTypeUpdateComponent;
        let fixture: ComponentFixture<ParSystemTypeUpdateComponent>;
        let service: ParSystemTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParSystemTypeUpdateComponent]
            })
                .overrideTemplate(ParSystemTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParSystemTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParSystemTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ParSystemType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parSystemType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ParSystemType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parSystemType = entity;
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
