/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { ParCoinTypeComponent } from 'app/entities/par-coin-type/par-coin-type.component';
import { ParCoinTypeService } from 'app/entities/par-coin-type/par-coin-type.service';
import { ParCoinType } from 'app/shared/model/par-coin-type.model';

describe('Component Tests', () => {
    describe('ParCoinType Management Component', () => {
        let comp: ParCoinTypeComponent;
        let fixture: ComponentFixture<ParCoinTypeComponent>;
        let service: ParCoinTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParCoinTypeComponent],
                providers: []
            })
                .overrideTemplate(ParCoinTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParCoinTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParCoinTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParCoinType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parCoinTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
