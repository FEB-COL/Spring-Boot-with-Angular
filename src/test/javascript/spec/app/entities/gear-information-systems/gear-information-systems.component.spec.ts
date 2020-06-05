/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearInformationSystemsComponent } from 'app/entities/gear-information-systems/gear-information-systems.component';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems/gear-information-systems.service';
import { GearInformationSystems } from 'app/shared/model/gear-information-systems.model';

describe('Component Tests', () => {
    describe('GearInformationSystems Management Component', () => {
        let comp: GearInformationSystemsComponent;
        let fixture: ComponentFixture<GearInformationSystemsComponent>;
        let service: GearInformationSystemsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearInformationSystemsComponent],
                providers: []
            })
                .overrideTemplate(GearInformationSystemsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearInformationSystemsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearInformationSystemsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearInformationSystems(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearInformationSystems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
