/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearLibraryDetailComponent } from 'app/entities/gear-library/gear-library-detail.component';
import { GearLibrary } from 'app/shared/model/gear-library.model';

describe('Component Tests', () => {
    describe('GearLibrary Management Detail Component', () => {
        let comp: GearLibraryDetailComponent;
        let fixture: ComponentFixture<GearLibraryDetailComponent>;
        const route = ({ data: of({ gearLibrary: new GearLibrary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearLibraryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearLibraryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearLibraryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearLibrary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
