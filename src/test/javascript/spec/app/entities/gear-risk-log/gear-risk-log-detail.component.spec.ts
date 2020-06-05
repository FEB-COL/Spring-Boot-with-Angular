/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearRiskLogDetailComponent } from 'app/entities/gear-risk-log/gear-risk-log-detail.component';
import { GearRiskLog } from 'app/shared/model/gear-risk-log.model';

describe('Component Tests', () => {
    describe('GearRiskLog Management Detail Component', () => {
        let comp: GearRiskLogDetailComponent;
        let fixture: ComponentFixture<GearRiskLogDetailComponent>;
        const route = ({ data: of({ gearRiskLog: new GearRiskLog(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearRiskLogDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearRiskLogDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearRiskLogDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearRiskLog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
