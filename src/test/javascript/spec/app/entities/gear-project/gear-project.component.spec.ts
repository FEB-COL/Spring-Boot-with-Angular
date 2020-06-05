/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearProjectComponent } from 'app/entities/gear-project/gear-project.component';
import { GearProjectService } from 'app/entities/gear-project/gear-project.service';
import { GearProject } from 'app/shared/model/gear-project.model';

describe('Component Tests', () => {
    describe('GearProject Management Component', () => {
        let comp: GearProjectComponent;
        let fixture: ComponentFixture<GearProjectComponent>;
        let service: GearProjectService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearProjectComponent],
                providers: []
            })
                .overrideTemplate(GearProjectComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearProjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearProjectService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearProject(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearProjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
