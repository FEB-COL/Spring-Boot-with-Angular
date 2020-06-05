/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisUpdateComponent } from 'app/entities/gear-diagnosis/gear-diagnosis-update.component';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis/gear-diagnosis.service';
import { GearDiagnosis } from 'app/shared/model/gear-diagnosis.model';

describe('Component Tests', () => {
    describe('GearDiagnosis Management Update Component', () => {
        let comp: GearDiagnosisUpdateComponent;
        let fixture: ComponentFixture<GearDiagnosisUpdateComponent>;
        let service: GearDiagnosisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisUpdateComponent]
            })
                .overrideTemplate(GearDiagnosisUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagnosisUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagnosis(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagnosis = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDiagnosis();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDiagnosis = entity;
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
