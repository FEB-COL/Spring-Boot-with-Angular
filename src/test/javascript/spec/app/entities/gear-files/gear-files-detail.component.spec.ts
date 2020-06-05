/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearFilesDetailComponent } from 'app/entities/gear-files/gear-files-detail.component';
import { GearFiles } from 'app/shared/model/gear-files.model';

describe('Component Tests', () => {
    describe('GearFiles Management Detail Component', () => {
        let comp: GearFilesDetailComponent;
        let fixture: ComponentFixture<GearFilesDetailComponent>;
        const route = ({ data: of({ gearFiles: new GearFiles(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearFilesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearFilesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearFilesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearFiles).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
