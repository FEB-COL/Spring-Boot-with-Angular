/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisTypeUpdateComponent } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type-update.component';
import { GearDiagnosisTypeService } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type.service';
import { GearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

describe('Component Tests', () => {
    describe('GearDiagnosisType Management Update Component', () => {
        let comp: GearDiagnosisTypeUpdateComponent;
        let fixture: ComponentFixture<GearDiagnosisTypeUpdateComponent>;
        let service: GearDiagnosisTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisTypeUpdateComponent]
            })
                .overrideTemplate(GearDiagnosisTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagnosisTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagnosisType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagnosisType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagnosisType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagnosisType = entity;
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
