/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearAmbitComponent } from 'app/entities/gear-ambit/gear-ambit.component';
import { GearAmbitService } from 'app/entities/gear-ambit/gear-ambit.service';
import { GearAmbit } from 'app/shared/model/gear-ambit.model';

describe('Component Tests', () => {
    describe('GearAmbit Management Component', () => {
        let comp: GearAmbitComponent;
        let fixture: ComponentFixture<GearAmbitComponent>;
        let service: GearAmbitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearAmbitComponent],
                providers: []
            })
                .overrideTemplate(GearAmbitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearAmbitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearAmbitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearAmbit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearAmbits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
