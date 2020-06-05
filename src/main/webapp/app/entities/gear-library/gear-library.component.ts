import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearLibrary } from 'app/shared/model/gear-library.model';

/** este es el modulo de file upload OJO */
import { IAlFileUpload } from 'app/shared/model/file-upload.model';
import { Principal } from 'app/core';
import { GearLibraryService } from './gear-library.service';

import { Router } from '@angular/router';

/** Componentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { LibraryCreateUpdateComponent } from './modalsLibrary/library-create-update.component';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { SERVER_API_URL } from 'app/app.constants';

/** importacion de servicio de gestor Documental */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IGearFiles } from 'app/shared/model/gear-files.model';
import { GearFilesService } from 'app/entities/gear-files';
import { GearDomainService } from 'app/entities/gear-domain';
import { GearDocumentTypeService } from 'app/entities/gear-document-type';
import { IGearDomain } from 'app/shared/model/gear-domain.model';

@Component({
    selector: 'jhi-gear-library',
    templateUrl: './gear-library.component.html',
    styleUrls: ['./gear-library.component.scss']
})
export class GearLibraryComponent implements OnInit, OnDestroy, AfterViewInit {
    dataSource: MatTableDataSource<IGearLibrary>;
    gearLibraries: IGearLibrary[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearLibrary[]> = new ReplaySubject<IGearLibrary[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearLibrary[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Estructura de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar

    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'documentName', visible: true, isModelProperty: true },
        { name: 'Titulo', property: 'documentTitle', visible: true, isModelProperty: true },
        { name: 'Tipo', property: 'documentType', visible: true, isModelProperty: true },
        { name: 'Descripcion', property: 'documentDescription', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    /**  Variables para la creacion-Eliminacion y Edicion */

    isSaving: boolean;
    //Modelos de fileUpload
    fileUpload: IAlFileUpload;
    file: File = null;

    // ===== configuracion de fury para formulario ojo ===
    accountFormGroup: FormGroup;
    passwordFormGroup: FormGroup;
    confirmFormGroup: FormGroup;

    verticalAccountFormGroup: FormGroup;
    verticalPasswordFormGroup: FormGroup;
    verticalConfirmFormGroup: FormGroup;

    phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

    passwordInputType = 'password';
    form: FormGroup;

    // ==== configuracion de para metros para guardas ojo ====
    titulo: string;
    descripcion: string;
    gearLibrarys: IGearLibrary;

    constructor(
        private gearLibraryService: GearLibraryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        // tipo Docuemntos
        private documentTypeService: GearDocumentTypeService,
        private http: HttpClient,
        //configuracion de formulario
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackbar: MatSnackBar
    ) {}

    /**  Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO */
    loadAll() {
        this.gearLibraryService.query().subscribe(
            (res: HttpResponse<IGearLibrary[]>) => {
                this.gearLibraries = res.body;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.gearLibraries);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Datos desde BD', this.gearLibraries);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /**  Start  Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        //Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ======= start Funcion para el filtrado ===========
    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }
    // ======= End Funcion para el filtrado ===========
    /**  End  Funciones Necesarias que Funcionan con el thema Fury */

    /** Activacion para la subida del documento */
    onFileSelected(event) {
        console.log('archivo seleccionado OJO', event);
        // cargamos all en fileUP el contenido de la selecion del archivo que se seleciona OJO
        console.log('datos del archivo-------->', event.target.files[0]);
        this.file = <File>event.target.files[0];
    }

    /** Subida de Documento y guardado en la BD */
    upload() {
        // alitamos para el guardado en la base de datos
        this.gearLibrarys = new class implements IGearLibrary {
            customFieldId: number;
            documentDescription: string;
            documentDomain: string;
            documentIdAlfresco: string;
            documentIsCopy: boolean;
            documentIsDraft: boolean;
            documentName: string;
            documentTitle: string;
            stringdocumentType: string;
            folderIdAlfresco: string;
            gearDomainId: number;
            gearDomainName: string;
            id: number;
            idFile: string;
            labelField: string;
            nameFolderAlfresco: string;
            nameSiteAlfresco: string;
            propertieName: string;
            siteIdAlfresco: string;
            templateId: number;
            typeField: string;
            valueField: string;
        }();
        this.gearLibrarys.documentTitle = this.titulo;
        this.gearLibrarys.documentDescription = this.descripcion;
        this.gearLibrarys.documentName = this.file.name;
        this.gearLibrarys.nameSiteAlfresco = 'Gear';
        this.gearLibrarys.documentType = 'Documento';

        // ====== Armado de peticion que vamos a pasar ojo con esta parte =======
        console.log('archivo de subidaxxxx', this.file);
        // ====== preparacion de archivo para la subida ==========
        const fd = new FormData();
        fd.append('file', this.file, this.file.name);
        fd.append('title', this.titulo);
        fd.append('description', this.descripcion);

        // ======= Servicio API del Back ===================
        let resourceUrlUpload = SERVER_API_URL + 'api/gear-files/upload';

        console.log('xxxxxxxxx', this.titulo);
        console.log('yuyyyyyy', this.descripcion);
        this.http.post(resourceUrlUpload, fd).subscribe(
            rest => {
                let result = JSON.parse(rest['message']['body']);
                result = result['entry']['id'];
                console.log('xxxxx@@@@@', result);
                swal('Se Subio Correctamente el Documento');
                //proceso de guardado OJO
                this.gearLibrarys.documentIdAlfresco = result;
                console.log('variable de guarda xxx', this.gearLibrarys);

                this.subscribeToSaveResponse(this.gearLibraryService.create(this.gearLibrarys));
                this.loadAll();
            },
            (res: HttpErrorResponse) => {
                console.log('Error', res);
                swal('El Documento esta repetido en el Gestor');
            }
        );
    }

    /** */
    private subidaDocumento(result: any) {
        result.subscribe(
            (res: any) => console.log('correcto FEB', res),
            (res: HttpErrorResponse) => console.log('Eroro de subida OJO', res)
        );
    }

    /** Descarga del Documento */
    download(costumer) {
        let idAlfresco = costumer.documentIdAlfresco;
        console.log('@@@@@@enviode id alfresco', idAlfresco);
        let resourceUrlUpload = SERVER_API_URL + 'api/gear-files/download';
        const fd = new FormData();
        fd.append('idAlfrescoFile', idAlfresco);
        this.http.post(resourceUrlUpload, fd).subscribe(
            rest => {
                console.log('Descarga de documento', rest['message']);

                swal({
                    title: 'Descargar',
                    type: 'info',
                    html: 'Descarga <b>Ahora el Archivo</b>, ' + '<a href=' + rest['message'] + '>link</a> ',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false
                });
            },
            (res: HttpErrorResponse) => {
                console.log('Error', res);
                swal('Error En descargar el Documento');
            }
        );
    }

    /** Cargue Inicial de la Pagina */
    ngOnInit() {
        // ===== Inicializacion de Variables ======
        this.titulo = '';
        this.descripcion = '';

        this.principal
            .identity()
            .then(account => {
                this.currentAccount = account;
            })
            .catch(err => {
                console.log('Something went wrong: ' + err.message);
                this.router.navigate(['']);
            });
        this.loadAll();
        this.registerChangeInGearLibraries();

        // ======================= Configuracion del Formulario ==============================

        this.accountFormGroup = this.fb.group({
            username: [null, Validators.required],
            name: [null, Validators.required]
        });

        this.passwordFormGroup = this.fb.group({
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirm: [null, Validators.required]
        });

        this.confirmFormGroup = this.fb.group({
            terms: [null, Validators.requiredTrue]
        });

        this.verticalAccountFormGroup = this.fb.group({
            username: [null, Validators.required],
            name: [null, Validators.required],
            email: [null, Validators.required],
            phonePrefix: [this.phonePrefixOptions[3]],
            phone: []
        });

        this.verticalPasswordFormGroup = this.fb.group({
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirm: [null, Validators.required]
        });

        this.verticalConfirmFormGroup = this.fb.group({
            terms: [null, Validators.requiredTrue]
        });
    }

    /** Create Document Library */
    createDocumentLibrary() {
        this.dialog
            .open(LibraryCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearLibrary: IGearLibrary) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearLibrary) {
                    console.log('entro en la creacion');
                    console.log('lo que se guardara', gearLibrary);

                    // Funcion de Creacion de Dominio
                    this.subscribeToSaveResponse(this.gearLibraryService.create(gearLibrary));
                    console.log('elementos de Dominios', this.gearLibraries);
                    // Fin de creacion de dominio

                    this.subject$.next(this.gearLibraries);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    /** */
    updateDocumentLibrary(gearLibrary) {
        this.dialog
            .open(LibraryCreateUpdateComponent, {
                data: gearLibrary
            })
            .afterClosed()
            .subscribe(gearLibrary => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearLibrary) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearLibraryService.update(gearLibrary));

                    const index = this.gearLibraries.findIndex(existingCustomer => existingCustomer.id === gearLibrary.id);
                    // Actulizacion de la tabla
                    this.gearLibraries[index] = gearLibrary;
                    this.subject$.next(this.gearLibraries);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    deleteDocumentLibrary(gearLibrary) {
        // Eliminacion de Archivo OJO
        if (gearLibrary) {
            this.gearLibraryService.delete(gearLibrary.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
            });
            this.gearLibraries.splice(this.gearLibraries.findIndex(existingCustomer => existingCustomer.id === gearLibrary.id), 1);
            this.subject$.next(this.gearLibraries);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearLibraries() {
        this.eventSubscriber = this.eventManager.subscribe('gearLibraryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =================== Funciones necesario para la creacion  ==========================
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearLibrary>>) {
        result.subscribe((res: HttpResponse<IGearLibrary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ====================== en esta Funcion se actuliza el componente ===============================

    showPassword() {
        this.passwordInputType = 'text';
        this.cd.markForCheck();
    }

    hidePassword() {
        this.passwordInputType = 'password';
        this.cd.markForCheck();
    }

    submit() {
        this.snackbar.open('Hooray! You successfully created your account.', null, {
            duration: 5000
        });
    }
}
