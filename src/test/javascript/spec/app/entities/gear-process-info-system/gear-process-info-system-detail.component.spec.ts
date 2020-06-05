/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProcessInfoSystemDetailComponent } from 'app/entities/gear-process-info-system/gear-process-info-system-detail.component';
import { GearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

describe('Component Tests', () => {
    describe('GearProcessInfoSystem Management Detail Component', () => {
        let comp: GearProcessInfoSystemDetailComponent;
        let fixture: ComponentFixture<GearProcessInfoSystemDetailComponent>;
        const route = ({ data: of({ gearProcessInfoSystem: new GearProcessInfoSystem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProcessInfoSystemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearProcessInfoSystemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearProcessInfoSystemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearProcessInfoSystem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
