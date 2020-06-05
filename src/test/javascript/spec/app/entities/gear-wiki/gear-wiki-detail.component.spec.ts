/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeargatewayTestModule } from '../../../test.module';
import { GearWikiDetailComponent } from 'app/entities/gear-wiki/gear-wiki-detail.component';
import { GearWiki } from 'app/shared/model/gear-wiki.model';

describe('Component Tests', () => {
    describe('GearWiki Management Detail Component', () => {
        let comp: GearWikiDetailComponent;
        let fixture: ComponentFixture<GearWikiDetailComponent>;
        const route = ({ data: of({ gearWiki: new GearWiki(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearWikiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GearWikiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GearWikiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gearWiki).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
