/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDocumentTypeDetailComponent } from 'app/entities/gear-document-type/gear-document-type-detail.component';
import { GearDocumentType } from 'app/shared/model/gear-document-type.model';

describe('Component Tests', () => {
    describe('GearDocumentType Management Detail Component', () => {
        let comp: GearDocumentTypeDetailComponent;
        let fixture: ComponentFixture<GearDocumentTypeDetailComponent>;
        const route = ({ data: of({ gearDocumentType: new GearDocumentType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDocumentTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDocumentTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDocumentTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDocumentType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
