/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearIterationComponent } from 'app/entities/gear-iteration/gear-iteration.component';
import { GearIterationService } from 'app/entities/gear-iteration/gear-iteration.service';
import { GearIteration } from 'app/shared/model/gear-iteration.model';

describe('Component Tests', () => {
    describe('GearIteration Management Component', () => {
        let comp: GearIterationComponent;
        let fixture: ComponentFixture<GearIterationComponent>;
        let service: GearIterationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearIterationComponent],
                providers: []
            })
                .overrideTemplate(GearIterationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearIterationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearIterationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearIteration(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearIterations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
