/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearFilesComponent } from 'app/entities/gear-files/gear-files.component';
import { GearFilesService } from 'app/entities/gear-files/gear-files.service';
import { GearFiles } from 'app/shared/model/gear-files.model';

describe('Component Tests', () => {
    describe('GearFiles Management Component', () => {
        let comp: GearFilesComponent;
        let fixture: ComponentFixture<GearFilesComponent>;
        let service: GearFilesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearFilesComponent],
                providers: []
            })
                .overrideTemplate(GearFilesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearFilesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearFilesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearFiles(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearFiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
