/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOrganizationalUnitComponent } from 'app/entities/gear-organizational-unit/gear-organizational-unit.component';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit/gear-organizational-unit.service';
import { GearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

describe('Component Tests', () => {
    describe('GearOrganizationalUnit Management Component', () => {
        let comp: GearOrganizationalUnitComponent;
        let fixture: ComponentFixture<GearOrganizationalUnitComponent>;
        let service: GearOrganizationalUnitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOrganizationalUnitComponent],
                providers: []
            })
                .overrideTemplate(GearOrganizationalUnitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearOrganizationalUnitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearOrganizationalUnitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearOrganizationalUnit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearOrganizationalUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
