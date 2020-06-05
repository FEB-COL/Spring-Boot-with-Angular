/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearRiskLogComponent } from 'app/entities/gear-risk-log/gear-risk-log.component';
import { GearRiskLogService } from 'app/entities/gear-risk-log/gear-risk-log.service';
import { GearRiskLog } from 'app/shared/model/gear-risk-log.model';

describe('Component Tests', () => {
    describe('GearRiskLog Management Component', () => {
        let comp: GearRiskLogComponent;
        let fixture: ComponentFixture<GearRiskLogComponent>;
        let service: GearRiskLogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearRiskLogComponent],
                providers: []
            })
                .overrideTemplate(GearRiskLogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearRiskLogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearRiskLogService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearRiskLog(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearRiskLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
