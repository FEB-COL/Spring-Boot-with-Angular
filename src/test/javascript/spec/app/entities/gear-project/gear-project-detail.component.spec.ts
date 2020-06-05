/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectDetailComponent } from 'app/entities/gear-project/gear-project-detail.component';
import { GearProject } from 'app/shared/model/gear-project.model';

describe('Component Tests', () => {
    describe('GearProject Management Detail Component', () => {
        let comp: GearProjectDetailComponent;
        let fixture: ComponentFixture<GearProjectDetailComponent>;
        const route = ({ data: of({ gearProject: new GearProject(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearProjectDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearProjectDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearProject).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
