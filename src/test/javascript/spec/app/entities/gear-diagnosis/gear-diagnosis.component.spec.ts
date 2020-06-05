/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisComponent } from 'app/entities/gear-diagnosis/gear-diagnosis.component';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis/gear-diagnosis.service';
import { GearDiagnosis } from 'app/shared/model/gear-diagnosis.model';

describe('Component Tests', () => {
    describe('GearDiagnosis Management Component', () => {
        let comp: GearDiagnosisComponent;
        let fixture: ComponentFixture<GearDiagnosisComponent>;
        let service: GearDiagnosisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisComponent],
                providers: []
            })
                .overrideTemplate(GearDiagnosisComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagnosisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDiagnosis(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDiagnoses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
