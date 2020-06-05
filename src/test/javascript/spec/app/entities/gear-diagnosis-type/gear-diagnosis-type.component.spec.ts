/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisTypeComponent } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type.component';
import { GearDiagnosisTypeService } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type.service';
import { GearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

describe('Component Tests', () => {
    describe('GearDiagnosisType Management Component', () => {
        let comp: GearDiagnosisTypeComponent;
        let fixture: ComponentFixture<GearDiagnosisTypeComponent>;
        let service: GearDiagnosisTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisTypeComponent],
                providers: []
            })
                .overrideTemplate(GearDiagnosisTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDiagnosisTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDiagnosisTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDiagnosisType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDiagnosisTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
