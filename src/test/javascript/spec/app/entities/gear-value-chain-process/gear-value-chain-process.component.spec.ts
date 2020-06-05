/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearValueChainProcessComponent } from 'app/entities/gear-value-chain-process/gear-value-chain-process.component';
import { GearValueChainProcessService } from 'app/entities/gear-value-chain-process/gear-value-chain-process.service';
import { GearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

describe('Component Tests', () => {
    describe('GearValueChainProcess Management Component', () => {
        let comp: GearValueChainProcessComponent;
        let fixture: ComponentFixture<GearValueChainProcessComponent>;
        let service: GearValueChainProcessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearValueChainProcessComponent],
                providers: []
            })
                .overrideTemplate(GearValueChainProcessComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearValueChainProcessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearValueChainProcessService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearValueChainProcess(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearValueChainProcesses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
