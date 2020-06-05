/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearUserDetailComponent } from 'app/entities/gear-user/gear-user-detail.component';
import { GearUser } from 'app/shared/model/gear-user.model';

describe('Component Tests', () => {
    describe('GearUser Management Detail Component', () => {
        let comp: GearUserDetailComponent;
        let fixture: ComponentFixture<GearUserDetailComponent>;
        const route = ({ data: of({ gearUser: new GearUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
