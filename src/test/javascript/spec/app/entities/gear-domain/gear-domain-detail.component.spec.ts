/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearDomainDetailComponent } from 'app/entities/gear-domain/gear-domain-detail.component';
import { GearDomain } from 'app/shared/model/gear-domain.model';

describe('Component Tests', () => {
    describe('GearDomain Management Detail Component', () => {
        let comp: GearDomainDetailComponent;
        let fixture: ComponentFixture<GearDomainDetailComponent>;
        const route = ({ data: of({ gearDomain: new GearDomain(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearDomainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearDomainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearDomainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearDomain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
