/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeargatewayTestModule } from '../../../test.module';
import { GearUserComponent } from 'app/entities/gear-user/gear-user.component';
import { GearUserService } from 'app/entities/gear-user/gear-user.service';
import { GearUser } from 'app/shared/model/gear-user.model';

describe('Component Tests', () => {
    describe('GearUser Management Component', () => {
        let comp: GearUserComponent;
        let fixture: ComponentFixture<GearUserComponent>;
        let service: GearUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeargatewayTestModule],
                declarations: [GearUserComponent],
                providers: []
            })
                .overrideTemplate(GearUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GearUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GearUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GearUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gearUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
