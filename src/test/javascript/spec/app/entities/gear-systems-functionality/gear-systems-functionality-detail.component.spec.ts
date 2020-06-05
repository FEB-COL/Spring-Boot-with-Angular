/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearSystemsFunctionalityDetailComponent } from 'app/entities/gear-systems-functionality/gear-systems-functionality-detail.component';
import { GearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';

describe('Component Tests', () => {
    describe('GearSystemsFunctionality Management Detail Component', () => {
        let comp: GearSystemsFunctionalityDetailComponent;
        let fixture: ComponentFixture<GearSystemsFunctionalityDetailComponent>;
        const route = ({ data: of({ gearSystemsFunctionality: new GearSystemsFunctionality(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearSystemsFunctionalityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearSystemsFunctionalityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearSystemsFunctionalityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearSystemsFunctionality).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
