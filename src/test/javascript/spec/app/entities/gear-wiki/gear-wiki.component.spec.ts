/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearWikiComponent } from 'app/entities/gear-wiki/gear-wiki.component';
import { GearWikiService } from 'app/entities/gear-wiki/gear-wiki.service';
import { GearWiki } from 'app/shared/model/gear-wiki.model';

describe('Component Tests', () => {
    describe('GearWiki Management Component', () => {
        let comp: GearWikiComponent;
        let fixture: ComponentFixture<GearWikiComponent>;
        let service: GearWikiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearWikiComponent],
                providers: []
            })
                .overrideTemplate(GearWikiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearWikiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearWikiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearWiki(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearWikis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
