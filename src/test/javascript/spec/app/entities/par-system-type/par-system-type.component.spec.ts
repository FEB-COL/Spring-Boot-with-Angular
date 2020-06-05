/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { ParSystemTypeComponent } from 'app/entities/par-system-type/par-system-type.component';
import { ParSystemTypeService } from 'app/entities/par-system-type/par-system-type.service';
import { ParSystemType } from 'app/shared/model/par-system-type.model';

describe('Component Tests', () => {
    describe('ParSystemType Management Component', () => {
        let comp: ParSystemTypeComponent;
        let fixture: ComponentFixture<ParSystemTypeComponent>;
        let service: ParSystemTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParSystemTypeComponent],
                providers: []
            })
                .overrideTemplate(ParSystemTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParSystemTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParSystemTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParSystemType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parSystemTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
