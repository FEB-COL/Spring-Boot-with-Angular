/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearFilesUpdateComponent } from 'app/entities/gear-files/gear-files-update.component';
import { GearFilesService } from 'app/entities/gear-files/gear-files.service';
import { GearFiles } from 'app/shared/model/gear-files.model';

describe('Component Tests', () => {
    describe('GearFiles Management Update Component', () => {
        let comp: GearFilesUpdateComponent;
        let fixture: ComponentFixture<GearFilesUpdateComponent>;
        let service: GearFilesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearFilesUpdateComponent]
            })
                .overrideTemplate(GearFilesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearFilesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearFilesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearFiles(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearFiles = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearFiles();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearFiles = entity;
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
