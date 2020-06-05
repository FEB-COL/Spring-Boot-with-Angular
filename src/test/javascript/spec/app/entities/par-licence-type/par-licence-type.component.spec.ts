/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { ParLicenceTypeComponent } from 'app/entities/par-licence-type/par-licence-type.component';
import { ParLicenceTypeService } from 'app/entities/par-licence-type/par-licence-type.service';
import { ParLicenceType } from 'app/shared/model/par-licence-type.model';

describe('Component Tests', () => {
    describe('ParLicenceType Management Component', () => {
        let comp: ParLicenceTypeComponent;
        let fixture: ComponentFixture<ParLicenceTypeComponent>;
        let service: ParLicenceTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParLicenceTypeComponent],
                providers: []
            })
                .overrideTemplate(ParLicenceTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParLicenceTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParLicenceTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParLicenceType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parLicenceTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
