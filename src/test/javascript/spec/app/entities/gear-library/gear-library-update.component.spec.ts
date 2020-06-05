/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearLibraryUpdateComponent } from 'app/entities/gear-library/gear-library-update.component';
import { GearLibraryService } from 'app/entities/gear-library/gear-library.service';
import { GearLibrary } from 'app/shared/model/gear-library.model';

describe('Component Tests', () => {
    describe('GearLibrary Management Update Component', () => {
        let comp: GearLibraryUpdateComponent;
        let fixture: ComponentFixture<GearLibraryUpdateComponent>;
        let service: GearLibraryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearLibraryUpdateComponent]
            })
                .overrideTemplate(GearLibraryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearLibraryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearLibraryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearLibrary(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearLibrary = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearLibrary();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearLibrary = entity;
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
