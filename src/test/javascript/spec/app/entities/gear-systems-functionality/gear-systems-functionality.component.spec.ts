/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSystemsFunctionalityComponent } from 'app/entities/gear-systems-functionality/gear-systems-functionality.component';
import { GearSystemsFunctionalityService } from 'app/entities/gear-systems-functionality/gear-systems-functionality.service';
import { GearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';

describe('Component Tests', () => {
    describe('GearSystemsFunctionality Management Component', () => {
        let comp: GearSystemsFunctionalityComponent;
        let fixture: ComponentFixture<GearSystemsFunctionalityComponent>;
        let service: GearSystemsFunctionalityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSystemsFunctionalityComponent],
                providers: []
            })
                .overrideTemplate(GearSystemsFunctionalityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearSystemsFunctionalityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearSystemsFunctionalityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearSystemsFunctionality(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearSystemsFunctionalities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
