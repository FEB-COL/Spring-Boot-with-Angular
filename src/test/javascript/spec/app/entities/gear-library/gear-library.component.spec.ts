/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearLibraryComponent } from 'app/entities/gear-library/gear-library.component';
import { GearLibraryService } from 'app/entities/gear-library/gear-library.service';
import { GearLibrary } from 'app/shared/model/gear-library.model';

describe('Component Tests', () => {
    describe('GearLibrary Management Component', () => {
        let comp: GearLibraryComponent;
        let fixture: ComponentFixture<GearLibraryComponent>;
        let service: GearLibraryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearLibraryComponent],
                providers: []
            })
                .overrideTemplate(GearLibraryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearLibraryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearLibraryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearLibrary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearLibraries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
