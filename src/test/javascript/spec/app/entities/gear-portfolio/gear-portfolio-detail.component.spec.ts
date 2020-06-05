/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearPortfolioDetailComponent } from 'app/entities/gear-portfolio/gear-portfolio-detail.component';
import { GearPortfolio } from 'app/shared/model/gear-portfolio.model';

describe('Component Tests', () => {
    describe('GearPortfolio Management Detail Component', () => {
        let comp: GearPortfolioDetailComponent;
        let fixture: ComponentFixture<GearPortfolioDetailComponent>;
        const route = ({ data: of({ gearPortfolio: new GearPortfolio(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearPortfolioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearPortfolioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearPortfolioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearPortfolio).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
