/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearPortfolioUpdateComponent } from 'app/entities/gear-portfolio/gear-portfolio-update.component';
import { GearPortfolioService } from 'app/entities/gear-portfolio/gear-portfolio.service';
import { GearPortfolio } from 'app/shared/model/gear-portfolio.model';

describe('Component Tests', () => {
    describe('GearPortfolio Management Update Component', () => {
        let comp: GearPortfolioUpdateComponent;
        let fixture: ComponentFixture<GearPortfolioUpdateComponent>;
        let service: GearPortfolioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearPortfolioUpdateComponent]
            })
                .overrideTemplate(GearPortfolioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearPortfolioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearPortfolioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearPortfolio(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearPortfolio = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GearPortfolio();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gearPortfolio = entity;
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
