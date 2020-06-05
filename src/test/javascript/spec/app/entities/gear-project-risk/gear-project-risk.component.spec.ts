/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectRiskComponent } from 'app/entities/gear-project-risk/gear-project-risk.component';
import { GearProjectRiskService } from 'app/entities/gear-project-risk/gear-project-risk.service';
import { GearProjectRisk } from 'app/shared/model/gear-project-risk.model';

describe('Component Tests', () => {
    describe('GearProjectRisk Management Component', () => {
        let comp: GearProjectRiskComponent;
        let fixture: ComponentFixture<GearProjectRiskComponent>;
        let service: GearProjectRiskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectRiskComponent],
                providers: []
            })
                .overrideTemplate(GearProjectRiskComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProjectRiskComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProjectRiskService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearProjectRisk(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearProjectRisks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
