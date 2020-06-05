/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCustomFieldTemplateUpdateComponent } from 'app/entities/gear-custom-field-template/gear-custom-field-template-update.component';
import { GearCustomFieldTemplateService } from 'app/entities/gear-custom-field-template/gear-custom-field-template.service';
import { GearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

describe('Component Tests', () => {
    describe('GearCustomFieldTemplate Management Update Component', () => {
        let comp: GearCustomFieldTemplateUpdateComponent;
        let fixture: ComponentFixture<GearCustomFieldTemplateUpdateComponent>;
        let service: GearCustomFieldTemplateService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCustomFieldTemplateUpdateComponent]
            })
                .overrideTemplate(GearCustomFieldTemplateUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearCustomFieldTemplateUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCustomFieldTemplateService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearCustomFieldTemplate(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearCustomFieldTemplate = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearCustomFieldTemplate();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearCustomFieldTemplate = entity;
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
