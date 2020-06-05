/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GearUserService } from 'app/entities/gear-user/gear-user.service';
import { IGearUser, GearUser } from 'app/shared/model/gear-user.model';

describe('Service Tests', () => {
    describe('GearUser Service', () => {
        let injector: TestBed;
        let service: GearUserService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearUser;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearUserService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new GearUser(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                false,
                'AAAAAAA',
                0,
                currentDate,
                'AAAAAAA',
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        lastUpdatePasswordDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a GearUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        lastUpdatePasswordDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        lastUpdatePasswordDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new GearUser(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        password: 'BBBBBB',
                        email: 'BBBBBB',
                        avatar: 'BBBBBB',
                        profile: 'BBBBBB',
                        state: true,
                        idAlfresco: 'BBBBBB',
                        loginAttempts: 1,
                        lastUpdatePasswordDate: currentDate.format(DATE_FORMAT),
                        passwordResetKey: 'BBBBBB',
                        pin: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        lastUpdatePasswordDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of GearUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        password: 'BBBBBB',
                        email: 'BBBBBB',
                        avatar: 'BBBBBB',
                        profile: 'BBBBBB',
                        state: true,
                        idAlfresco: 'BBBBBB',
                        loginAttempts: 1,
                        lastUpdatePasswordDate: currentDate.format(DATE_FORMAT),
                        passwordResetKey: 'BBBBBB',
                        pin: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        lastUpdatePasswordDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a GearUser', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
