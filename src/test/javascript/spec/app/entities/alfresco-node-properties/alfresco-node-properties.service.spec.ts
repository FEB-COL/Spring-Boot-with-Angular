/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlfrescoNodePropertiesService } from 'app/entities/alfresco-node-properties/alfresco-node-properties.service';
import { IAlfrescoNodeProperties, AlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

describe('Service Tests', () => {
    describe('AlfrescoNodeProperties Service', () => {
        let injector: TestBed;
        let service: AlfrescoNodePropertiesService;
        let httpMock: HttpTestingController;
        let elemDefault: IAlfrescoNodeProperties;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AlfrescoNodePropertiesService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new AlfrescoNodeProperties(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
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

            it('should create a AlfrescoNodeProperties', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new AlfrescoNodeProperties(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AlfrescoNodeProperties', async () => {
                const returnedFromService = Object.assign(
                    {
                        documentType: 'BBBBBB',
                        documentTitle: 'BBBBBB',
                        fileName: 'BBBBBB',
                        siteId: 'BBBBBB',
                        description: 'BBBBBB',
                        notes: 'BBBBBB',
                        versionType: 'BBBBBB',
                        versionLabel: 'BBBBBB',
                        textField1: 'BBBBBB',
                        textField2: 'BBBBBB',
                        textField3: 'BBBBBB',
                        textField4: 'BBBBBB',
                        textField5: 'BBBBBB',
                        textField6: 'BBBBBB',
                        textField7: 'BBBBBB'
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

            it('should return a list of AlfrescoNodeProperties', async () => {
                const returnedFromService = Object.assign(
                    {
                        documentType: 'BBBBBB',
                        documentTitle: 'BBBBBB',
                        fileName: 'BBBBBB',
                        siteId: 'BBBBBB',
                        description: 'BBBBBB',
                        notes: 'BBBBBB',
                        versionType: 'BBBBBB',
                        versionLabel: 'BBBBBB',
                        textField1: 'BBBBBB',
                        textField2: 'BBBBBB',
                        textField3: 'BBBBBB',
                        textField4: 'BBBBBB',
                        textField5: 'BBBBBB',
                        textField6: 'BBBBBB',
                        textField7: 'BBBBBB'
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

            it('should delete a AlfrescoNodeProperties', async () => {
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
