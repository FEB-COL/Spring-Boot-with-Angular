/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearWikiUpdateComponent } from 'app/entities/gear-wiki/gear-wiki-update.component';
import { GearWikiService } from 'app/entities/gear-wiki/gear-wiki.service';
import { GearWiki } from 'app/shared/model/gear-wiki.model';

describe('Component Tests', () => {
    describe('GearWiki Management Update Component', () => {
        let comp: GearWikiUpdateComponent;
        let fixture: ComponentFixture<GearWikiUpdateComponent>;
        let service: GearWikiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearWikiUpdateComponent]
            })
                .overrideTemplate(GearWikiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearWikiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearWikiService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearWiki(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearWiki = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearWiki();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearWiki = entity;
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
