/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearPortfolioComponent } from 'app/entities/gear-portfolio/gear-portfolio.component';
import { GearPortfolioService } from 'app/entities/gear-portfolio/gear-portfolio.service';
import { GearPortfolio } from 'app/shared/model/gear-portfolio.model';

describe('Component Tests', () => {
    describe('GearPortfolio Management Component', () => {
        let comp: GearPortfolioComponent;
        let fixture: ComponentFixture<GearPortfolioComponent>;
        let service: GearPortfolioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearPortfolioComponent],
                providers: []
            })
                .overrideTemplate(GearPortfolioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearPortfolioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearPortfolioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearPortfolio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.portfoliosByUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
