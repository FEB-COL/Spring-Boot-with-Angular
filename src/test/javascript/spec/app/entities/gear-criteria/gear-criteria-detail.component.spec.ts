/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearCriteriaDetailComponent } from 'app/entities/gear-criteria/gear-criteria-detail.component';
import { GearCriteria } from 'app/shared/model/gear-criteria.model';

describe('Component Tests', () => {
    describe('GearCriteria Management Detail Component', () => {
        let comp: GearCriteriaDetailComponent;
        let fixture: ComponentFixture<GearCriteriaDetailComponent>;
        const route = ({ data: of({ gearCriteria: new GearCriteria(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearCriteriaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearCriteriaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearCriteriaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearCriteria).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
