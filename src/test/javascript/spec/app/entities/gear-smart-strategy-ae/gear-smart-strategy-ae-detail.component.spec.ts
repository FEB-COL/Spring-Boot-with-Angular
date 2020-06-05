/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSmartStrategyAEDetailComponent } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae-detail.component';
import { GearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearSmartStrategyAE Management Detail Component', () => {
        let comp: GearSmartStrategyAEDetailComponent;
        let fixture: ComponentFixture<GearSmartStrategyAEDetailComponent>;
        const route = ({ data: of({ gearSmartStrategyAE: new GearSmartStrategyAE(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSmartStrategyAEDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSmartStrategyAEDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSmartStrategyAEDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSmartStrategyAE).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
