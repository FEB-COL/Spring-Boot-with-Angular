/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCustomFieldTemplateComponent } from 'app/entities/gear-custom-field-template/gear-custom-field-template.component';
import { GearCustomFieldTemplateService } from 'app/entities/gear-custom-field-template/gear-custom-field-template.service';
import { GearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

describe('Component Tests', () => {
    describe('GearCustomFieldTemplate Management Component', () => {
        let comp: GearCustomFieldTemplateComponent;
        let fixture: ComponentFixture<GearCustomFieldTemplateComponent>;
        let service: GearCustomFieldTemplateService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCustomFieldTemplateComponent],
                providers: []
            })
                .overrideTemplate(GearCustomFieldTemplateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearCustomFieldTemplateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearCustomFieldTemplateService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearCustomFieldTemplate(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearCustomFieldTemplates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
