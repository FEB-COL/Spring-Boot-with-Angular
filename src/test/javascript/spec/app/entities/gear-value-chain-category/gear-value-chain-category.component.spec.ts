/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainCategoryComponent } from 'app/entities/gear-value-chain-category/gear-value-chain-category.component';
import { GearValueChainCategoryService } from 'app/entities/gear-value-chain-category/gear-value-chain-category.service';
import { GearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

describe('Component Tests', () => {
    describe('GearValueChainCategory Management Component', () => {
        let comp: GearValueChainCategoryComponent;
        let fixture: ComponentFixture<GearValueChainCategoryComponent>;
        let service: GearValueChainCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainCategoryComponent],
                providers: []
            })
                .overrideTemplate(GearValueChainCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearValueChainCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categoryByUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
