/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCriteriaComponent } from 'app/entities/gear-criteria/gear-criteria.component';
import { GearCriteriaService } from 'app/entities/gear-criteria/gear-criteria.service';
import { GearCriteria } from 'app/shared/model/gear-criteria.model';

describe('Component Tests', () => {
    describe('GearCriteria Management Component', () => {
        let comp: GearCriteriaComponent;
        let fixture: ComponentFixture<GearCriteriaComponent>;
        let service: GearCriteriaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCriteriaComponent],
                providers: []
            })
                .overrideTemplate(GearCriteriaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearCriteriaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCriteriaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearCriteria(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearCriteria[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
