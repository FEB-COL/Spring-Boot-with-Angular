/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDocumentTypeComponent } from 'app/entities/gear-document-type/gear-document-type.component';
import { GearDocumentTypeService } from 'app/entities/gear-document-type/gear-document-type.service';
import { GearDocumentType } from 'app/shared/model/gear-document-type.model';

describe('Component Tests', () => {
    describe('GearDocumentType Management Component', () => {
        let comp: GearDocumentTypeComponent;
        let fixture: ComponentFixture<GearDocumentTypeComponent>;
        let service: GearDocumentTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDocumentTypeComponent],
                providers: []
            })
                .overrideTemplate(GearDocumentTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearDocumentTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearDocumentTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearDocumentType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearDocumentTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
