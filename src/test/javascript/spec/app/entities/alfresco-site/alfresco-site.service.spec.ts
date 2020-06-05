/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlfrescoSiteService } from 'app/entities/alfresco-site/alfresco-site.service';
import { IAlfrescoSite, AlfrescoSite } from 'app/shared/model/alfresco-site.model';

describe('Service Tests', () => {
    describe('AlfrescoSite Service', () => {
        let injector: TestBed;
        let service: AlfrescoSiteService;
        let httpMock: HttpTestingController;
        let elemDefault: IAlfrescoSite;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AlfrescoSiteService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new AlfrescoSite(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AlfrescoSite', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new AlfrescoSite(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AlfrescoSite', async () => {
                const returnedFromService = Object.assign(
                    {
                        guid: 'BBBBBB',
                        identify: 'BBBBBB',
                        role: 'BBBBBB',
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        visibility: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AlfrescoSite', async () => {
                const returnedFromService = Object.assign(
                    {
                        guid: 'BBBBBB',
                        identify: 'BBBBBB',
                        role: 'BBBBBB',
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        visibility: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
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

            it('should delete a AlfrescoSite', async () => {
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
