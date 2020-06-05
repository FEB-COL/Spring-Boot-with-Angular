/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { ParSystemTypeDetailComponent } from 'app/entities/par-system-type/par-system-type-detail.component';
import { ParSystemType } from 'app/shared/model/par-system-type.model';

describe('Component Tests', () => {
    describe('ParSystemType Management Detail Component', () => {
        let comp: ParSystemTypeDetailComponent;
        let fixture: ComponentFixture<ParSystemTypeDetailComponent>;
        const route = ({ data: of({ parSystemType: new ParSystemType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [ParSystemTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParSystemTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParSystemTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parSystemType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
