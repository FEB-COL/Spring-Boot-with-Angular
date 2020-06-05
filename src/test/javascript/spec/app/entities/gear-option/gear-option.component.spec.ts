/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOptionComponent } from 'app/entities/gear-option/gear-option.component';
import { GearOptionService } from 'app/entities/gear-option/gear-option.service';
import { GearOption } from 'app/shared/model/gear-option.model';

describe('Component Tests', () => {
    describe('GearOption Management Component', () => {
        let comp: GearOptionComponent;
        let fixture: ComponentFixture<GearOptionComponent>;
        let service: GearOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOptionComponent],
                providers: []
            })
                .overrideTemplate(GearOptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearOptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearOptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearOption(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
