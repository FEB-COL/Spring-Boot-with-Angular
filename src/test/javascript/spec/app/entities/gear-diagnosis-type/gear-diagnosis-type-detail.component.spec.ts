/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDiagnosisTypeDetailComponent } from 'app/entities/gear-diagnosis-type/gear-diagnosis-type-detail.component';
import { GearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

describe('Component Tests', () => {
    describe('GearDiagnosisType Management Detail Component', () => {
        let comp: GearDiagnosisTypeDetailComponent;
        let fixture: ComponentFixture<GearDiagnosisTypeDetailComponent>;
        const route = ({ data: of({ gearDiagnosisType: new GearDiagnosisType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDiagnosisTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDiagnosisTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDiagnosisTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDiagnosisType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
