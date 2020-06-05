/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearOptionDetailComponent } from 'app/entities/gear-option/gear-option-detail.component';
import { GearOption } from 'app/shared/model/gear-option.model';

describe('Component Tests', () => {
    describe('GearOption Management Detail Component', () => {
        let comp: GearOptionDetailComponent;
        let fixture: ComponentFixture<GearOptionDetailComponent>;
        const route = ({ data: of({ gearOption: new GearOption(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearOptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearOptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearOptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearOption).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
