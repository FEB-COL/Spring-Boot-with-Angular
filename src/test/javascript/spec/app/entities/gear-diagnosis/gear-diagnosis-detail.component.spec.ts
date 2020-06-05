/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisDetailComponent } from 'app/entities/gear-diagnosis/gear-diagnosis-detail.component';
import { GearDiagnosis } from 'app/shared/model/gear-diagnosis.model';

describe('Component Tests', () => {
    describe('GearDiagnosis Management Detail Component', () => {
        let comp: GearDiagnosisDetailComponent;
        let fixture: ComponentFixture<GearDiagnosisDetailComponent>;
        const route = ({ data: of({ gearDiagnosis: new GearDiagnosis(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDiagnosisDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagnosisDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDiagnosis).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
