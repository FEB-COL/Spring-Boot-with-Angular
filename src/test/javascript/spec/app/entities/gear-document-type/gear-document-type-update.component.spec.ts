/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDocumentTypeUpdateComponent } from 'app/entities/gear-document-type/gear-document-type-update.component';
import { GearDocumentTypeService } from 'app/entities/gear-document-type/gear-document-type.service';
import { GearDocumentType } from 'app/shared/model/gear-document-type.model';

describe('Component Tests', () => {
    describe('GearDocumentType Management Update Component', () => {
        let comp: GearDocumentTypeUpdateComponent;
        let fixture: ComponentFixture<GearDocumentTypeUpdateComponent>;
        let service: GearDocumentTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDocumentTypeUpdateComponent]
            })
                .overrideTemplate(GearDocumentTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDocumentTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDocumentTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDocumentType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDocumentType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDocumentType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDocumentType = entity;
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
