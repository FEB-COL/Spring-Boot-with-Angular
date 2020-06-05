/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearIterationDetailComponent } from 'app/entities/gear-iteration/gear-iteration-detail.component';
import { GearIteration } from 'app/shared/model/gear-iteration.model';

describe('Component Tests', () => {
    describe('GearIteration Management Detail Component', () => {
        let comp: GearIterationDetailComponent;
        let fixture: ComponentFixture<GearIterationDetailComponent>;
        const route = ({ data: of({ gearIteration: new GearIteration(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearIterationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearIterationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearIterationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearIteration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
