/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainCategoryDetailComponent } from 'app/entities/gear-value-chain-category/gear-value-chain-category-detail.component';
import { GearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

describe('Component Tests', () => {
    describe('GearValueChainCategory Management Detail Component', () => {
        let comp: GearValueChainCategoryDetailComponent;
        let fixture: ComponentFixture<GearValueChainCategoryDetailComponent>;
        const route = ({ data: of({ gearValueChainCategory: new GearValueChainCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearValueChainCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearValueChainCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
