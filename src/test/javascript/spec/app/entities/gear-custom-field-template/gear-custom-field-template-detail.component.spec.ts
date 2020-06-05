/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCustomFieldTemplateDetailComponent } from 'app/entities/gear-custom-field-template/gear-custom-field-template-detail.component';
import { GearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

describe('Component Tests', () => {
    describe('GearCustomFieldTemplate Management Detail Component', () => {
        let comp: GearCustomFieldTemplateDetailComponent;
        let fixture: ComponentFixture<GearCustomFieldTemplateDetailComponent>;
        const route = ({ data: of({ gearCustomFieldTemplate: new GearCustomFieldTemplate(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCustomFieldTemplateDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearCustomFieldTemplateDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearCustomFieldTemplateDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearCustomFieldTemplate).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
