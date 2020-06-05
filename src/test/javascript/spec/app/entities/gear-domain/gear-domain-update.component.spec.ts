/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDomainUpdateComponent } from 'app/entities/gear-domain/gear-domain-update.component';
import { GearDomainService } from 'app/entities/gear-domain/gear-domain.service';
import { GearDomain } from 'app/shared/model/gear-domain.model';

describe('Component Tests', () => {
    describe('GearDomain Management Update Component', () => {
        let comp: GearDomainUpdateComponent;
        let fixture: ComponentFixture<GearDomainUpdateComponent>;
        let service: GearDomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDomainUpdateComponent]
            })
                .overrideTemplate(GearDomainUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDomainUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDomainService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDomain(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDomain = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearDomain();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearDomain = entity;
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
