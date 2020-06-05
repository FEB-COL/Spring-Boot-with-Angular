/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectUpdateComponent } from 'app/entities/gear-project/gear-project-update.component';
import { GearProjectService } from 'app/entities/gear-project/gear-project.service';
import { GearProject } from 'app/shared/model/gear-project.model';

describe('Component Tests', () => {
    describe('GearProject Management Update Component', () => {
        let comp: GearProjectUpdateComponent;
        let fixture: ComponentFixture<GearProjectUpdateComponent>;
        let service: GearProjectService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectUpdateComponent]
            })
                .overrideTemplate(GearProjectUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProjectUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProjectService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProject(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProject = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearProject();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearProject = entity;
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
