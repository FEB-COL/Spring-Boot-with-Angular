/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDomainComponent } from 'app/entities/gear-domain/gear-domain.component';
import { GearDomainService } from 'app/entities/gear-domain/gear-domain.service';
import { GearDomain } from 'app/shared/model/gear-domain.model';

describe('Component Tests', () => {
    describe('GearDomain Management Component', () => {
        let comp: GearDomainComponent;
        let fixture: ComponentFixture<GearDomainComponent>;
        let service: GearDomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDomainComponent],
                providers: []
            })
                .overrideTemplate(GearDomainComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDomainComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDomainService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDomain(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.domainsByUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
