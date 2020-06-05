/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSmartStrategyAEComponent } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae.component';
import { GearSmartStrategyAEService } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae.service';
import { GearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

describe('Component Tests', () => {
    describe('GearSmartStrategyAE Management Component', () => {
        let comp: GearSmartStrategyAEComponent;
        let fixture: ComponentFixture<GearSmartStrategyAEComponent>;
        let service: GearSmartStrategyAEService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSmartStrategyAEComponent],
                providers: []
            })
                .overrideTemplate(GearSmartStrategyAEComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSmartStrategyAEComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSmartStrategyAEService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSmartStrategyAE(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSmartStrategyAES[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
