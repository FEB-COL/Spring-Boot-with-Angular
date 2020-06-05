/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainMacroprocessComponent } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess.component';
import { GearValueChainMacroprocessService } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess.service';
import { GearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

describe('Component Tests', () => {
    describe('GearValueChainMacroprocess Management Component', () => {
        let comp: GearValueChainMacroprocessComponent;
        let fixture: ComponentFixture<GearValueChainMacroprocessComponent>;
        let service: GearValueChainMacroprocessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainMacroprocessComponent],
                providers: []
            })
                .overrideTemplate(GearValueChainMacroprocessComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainMacroprocessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainMacroprocessService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearValueChainMacroprocess(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearValueChainMacroprocesses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
