/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearInformationSystemsDetailComponent } from 'app/entities/gear-information-systems/gear-information-systems-detail.component';
import { GearInformationSystems } from 'app/shared/model/gear-information-systems.model';

describe('Component Tests', () => {
    describe('GearInformationSystems Management Detail Component', () => {
        let comp: GearInformationSystemsDetailComponent;
        let fixture: ComponentFixture<GearInformationSystemsDetailComponent>;
        const route = ({ data: of({ gearInformationSystems: new GearInformationSystems(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearInformationSystemsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearInformationSystemsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearInformationSystemsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearInformationSystems).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
