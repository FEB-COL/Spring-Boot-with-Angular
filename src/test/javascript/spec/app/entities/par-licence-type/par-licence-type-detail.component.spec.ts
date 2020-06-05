/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { ParLicenceTypeDetailComponent } from 'app/entities/par-licence-type/par-licence-type-detail.component';
import { ParLicenceType } from 'app/shared/model/par-licence-type.model';

describe('Component Tests', () => {
    describe('ParLicenceType Management Detail Component', () => {
        let comp: ParLicenceTypeDetailComponent;
        let fixture: ComponentFixture<ParLicenceTypeDetailComponent>;
        const route = ({ data: of({ parLicenceType: new ParLicenceType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParLicenceTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParLicenceTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParLicenceTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parLicenceType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
