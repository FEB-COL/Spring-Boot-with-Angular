/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { ParCoinTypeDetailComponent } from 'app/entities/par-coin-type/par-coin-type-detail.component';
import { ParCoinType } from 'app/shared/model/par-coin-type.model';

describe('Component Tests', () => {
    describe('ParCoinType Management Detail Component', () => {
        let comp: ParCoinTypeDetailComponent;
        let fixture: ComponentFixture<ParCoinTypeDetailComponent>;
        const route = ({ data: of({ parCoinType: new ParCoinType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParCoinTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParCoinTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParCoinTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parCoinType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
