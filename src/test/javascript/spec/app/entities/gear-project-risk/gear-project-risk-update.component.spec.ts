/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectRiskUpdateComponent } from 'app/entities/gear-project-risk/gear-project-risk-update.component';
import { GearProjectRiskService } from 'app/entities/gear-project-risk/gear-project-risk.service';
import { GearProjectRisk } from 'app/shared/model/gear-project-risk.model';

describe('Component Tests', () => {
    describe('GearProjectRisk Management Update Component', () => {
        let comp: GearProjectRiskUpdateComponent;
        let fixture: ComponentFixture<GearProjectRiskUpdateComponent>;
        let service: GearProjectRiskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectRiskUpdateComponent]
            })
                .overrideTemplate(GearProjectRiskUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProjectRiskUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProjectRiskService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProjectRisk(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProjectRisk = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProjectRisk();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProjectRisk = entity;
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
