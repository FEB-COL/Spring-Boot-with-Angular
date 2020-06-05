/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProcessInfoSystemComponent } from 'app/entities/gear-process-info-system/gear-process-info-system.component';
import { GearProcessInfoSystemService } from 'app/entities/gear-process-info-system/gear-process-info-system.service';
import { GearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

describe('Component Tests', () => {
    describe('GearProcessInfoSystem Management Component', () => {
        let comp: GearProcessInfoSystemComponent;
        let fixture: ComponentFixture<GearProcessInfoSystemComponent>;
        let service: GearProcessInfoSystemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProcessInfoSystemComponent],
                providers: []
            })
                .overrideTemplate(GearProcessInfoSystemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProcessInfoSystemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProcessInfoSystemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearProcessInfoSystem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearProcessInfoSystems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
