/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainProcessDetailComponent } from 'app/entities/gear-value-chain-process/gear-value-chain-process-detail.component';
import { GearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

describe('Component Tests', () => {
    describe('GearValueChainProcess Management Detail Component', () => {
        let comp: GearValueChainProcessDetailComponent;
        let fixture: ComponentFixture<GearValueChainProcessDetailComponent>;
        const route = ({ data: of({ gearValueChainProcess: new GearValueChainProcess(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainProcessDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearValueChainProcessDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearValueChainProcessDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearValueChainProcess).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
