/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainMacroprocessDetailComponent } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess-detail.component';
import { GearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

describe('Component Tests', () => {
    describe('GearValueChainMacroprocess Management Detail Component', () => {
        let comp: GearValueChainMacroprocessDetailComponent;
        let fixture: ComponentFixture<GearValueChainMacroprocessDetailComponent>;
        const route = ({ data: of({ gearValueChainMacroprocess: new GearValueChainMacroprocess(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainMacroprocessDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearValueChainMacroprocessDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainMacroprocessDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearValueChainMacroprocess).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
