/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearAmbitDetailComponent } from 'app/entities/gear-ambit/gear-ambit-detail.component';
import { GearAmbit } from 'app/shared/model/gear-ambit.model';

describe('Component Tests', () => {
    describe('GearAmbit Management Detail Component', () => {
        let comp: GearAmbitDetailComponent;
        let fixture: ComponentFixture<GearAmbitDetailComponent>;
        const route = ({ data: of({ gearAmbit: new GearAmbit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearAmbitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearAmbitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearAmbitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearAmbit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
