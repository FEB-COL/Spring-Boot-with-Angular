/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearIterationUpdateComponent } from 'app/entities/gear-iteration/gear-iteration-update.component';
import { GearIterationService } from 'app/entities/gear-iteration/gear-iteration.service';
import { GearIteration } from 'app/shared/model/gear-iteration.model';

describe('Component Tests', () => {
    describe('GearIteration Management Update Component', () => {
        let comp: GearIterationUpdateComponent;
        let fixture: ComponentFixture<GearIterationUpdateComponent>;
        let service: GearIterationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearIterationUpdateComponent]
            })
                .overrideTemplate(GearIterationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearIterationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearIterationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearIteration(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearIteration = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearIteration();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearIteration = entity;
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
