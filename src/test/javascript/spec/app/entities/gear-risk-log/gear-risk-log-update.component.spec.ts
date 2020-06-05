/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearRiskLogUpdateComponent } from 'app/entities/gear-risk-log/gear-risk-log-update.component';
import { GearRiskLogService } from 'app/entities/gear-risk-log/gear-risk-log.service';
import { GearRiskLog } from 'app/shared/model/gear-risk-log.model';

describe('Component Tests', () => {
    describe('GearRiskLog Management Update Component', () => {
        let comp: GearRiskLogUpdateComponent;
        let fixture: ComponentFixture<GearRiskLogUpdateComponent>;
        let service: GearRiskLogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearRiskLogUpdateComponent]
            })
                .overrideTemplate(GearRiskLogUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearRiskLogUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearRiskLogService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearRiskLog(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearRiskLog = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearRiskLog();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearRiskLog = entity;
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
