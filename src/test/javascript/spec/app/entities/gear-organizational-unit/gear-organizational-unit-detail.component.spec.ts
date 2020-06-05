/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOrganizationalUnitDetailComponent } from 'app/entities/gear-organizational-unit/gear-organizational-unit-detail.component';
import { GearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

describe('Component Tests', () => {
    describe('GearOrganizationalUnit Management Detail Component', () => {
        let comp: GearOrganizationalUnitDetailComponent;
        let fixture: ComponentFixture<GearOrganizationalUnitDetailComponent>;
        const route = ({ data: of({ gearOrganizationalUnit: new GearOrganizationalUnit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOrganizationalUnitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearOrganizationalUnitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearOrganizationalUnitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearOrganizationalUnit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
