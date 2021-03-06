import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDomain } from 'app/shared/model/gear-domain.model';
///este es el modulo de file upload OJO
import { IAlFileUpload } from 'app/shared/model/file-upload.model';
import { Principal } from 'app/core';
import { GearGestorDocumentalService } from './gear-gestor-documental.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

// consultar tipo de documerntos
import { GearDocumentTypeService } from './../gear-document-type/gear-document-type.service';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

// Importacion de Modal Create
import { CustomerCreateUpdateComponent } from './modalsDomains/customer-create-update.component';

// Implementacion Sweetalert
import swal from 'sweetalert2';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { SERVER_API_URL } from 'app/app.constants';
//importacion de servicio de gestor Documental
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IGearFiles } from 'app/shared/model/gear-files.model';
import { GearFilesService } from 'app/entities/gear-files';
import { GearDomainService } from 'app/entities/gear-domain';

@Component({
    selector: 'jhi-gear-gestor-documental',
    templateUrl: './gear-gestor-documental.component.html',
    styleUrls: ['./gear-gestor-documental.component.scss']
})
export class GearGestorDocumentalComponent implements OnInit, AfterViewInit, OnDestroy {
    // Variables para consulta tipo de documentos

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'documentName', 'documentDomain', 'documentTitle', 'documentType', 'documentDescription', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IGearFiles>; //IGearDomain>; // Array de la interface

    gearFiles: IGearFiles[]; //IGearDomain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearFiles[]> = new ReplaySubject<IGearFiles[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearFiles[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar

    geardomains: IGearDomain[]; // variable para el valor de la relacion
    geardomain: IGearDomain; // donde se alamcena el valor
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'documentName', visible: true, isModelProperty: true },
        { name: 'Dominio', property: 'documentDomain', visible: true, isModelProperty: true },
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

    /**
     * Variables para la creacion-Eliminacion y Edicion de Dominio
     */
    isSaving: boolean;
    //Modelos de fileUpload
    fileUpload: IAlFileUpload;
    file: File = null;

    ///configuracion de fury para formulario ojo
    accountFormGroup: FormGroup;
    passwordFormGroup: FormGroup;
    confirmFormGroup: FormGroup;

    verticalAccountFormGroup: FormGroup;
    verticalPasswordFormGroup: FormGroup;
    verticalConfirmFormGroup: FormGroup;

    phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

    passwordInputType = 'password';
    form: FormGroup;

    ///configuracion de para metros para guardas ojo
    titulo: string;
    descripcion: string;
    gearFile: IGearFiles;

    constructor(
        private gearFilesService: GearFilesService, //GearDocumentTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        // tipo Docuemntos
        private documentTypeService: GearDocumentTypeService,
        public readonly swalTargets: SwalPartialTargets,
        private http: HttpClient,
        //configuracion de formulario
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackbar: MatSnackBar,
        //configuracion para dominio
        private gearDomainService: GearDomainService
    ) {}

    // Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');
        this.gearFilesService.query().subscribe(
            (res: HttpResponse<IGearFiles[]>) => {
                this.gearFiles = res.body;

                // cargar el arreglo a la variable
                const auxFiles = this.gearFiles;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(auxFiles);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Domain traido de BD', this.gearFiles);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        //carga los dominios ojo con eta parte
        // ===== Staer Carga valores de dominios en el actualizar =========================

        this.gearDomainService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.geardomains = res.body;
                console.log('resultado de la lista de dominios existentes', this.geardomains);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /**
     * Funciones Necesarias que Funcionan con el thema Fury
     */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    //boton de activacion de subida de documentos
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    onFileSelected(event) {
        console.log('archivo seleccionado OJO FEB', event);
        //cargamos todo en fileUP el contenido de la selecion del archivo que se seleciona OJO
        console.log('datos del archivo-------->', event.target.files[0]);
        this.file = <File>event.target.files[0];
    }

    download(costumer) {
        let idAlfresco = costumer.documentIdAlfresco;
        console.log('@@@@@@enviode id alfresco', idAlfresco);
        let resourceUrlUpload = SERVER_API_URL + 'api/gear-files/download';
        const fd = new FormData();
        fd.append('idAlfrescoFile', idAlfresco);
        this.http.post(resourceUrlUpload, fd).subscribe(
            rest => {
                console.log('Descaga de documento', rest['message']);

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

    upload() {
        // alitamos para el guardado en la base de datos
        this.gearFile = new class implements IGearFiles {
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
        this.gearFile.documentTitle = this.titulo;
        this.gearFile.documentDescription = this.descripcion;
        this.gearFile.documentDomain = this.geardomain.name;
        this.gearFile.documentName = this.file.name;
        this.gearFile.nameSiteAlfresco = 'Gear';
        this.gearFile.documentType = 'Documento';

        ///Armado de peticion que vamos a pasar ojo con esta parte
        console.log('archivo de subidaxxxx', this.file);
        //preparacion de archivo para la subida
        const fd = new FormData();
        fd.append('file', this.file, this.file.name);
        fd.append('title', this.titulo);
        fd.append('description', this.descripcion);
        // fd.append('domain', this.gearDomain.name);
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
                this.gearFile.documentIdAlfresco = result;
                console.log('variable de guarda xxx', this.gearFile);

                this.subscribeToSaveResponse(this.gearFilesService.create(this.gearFile));
                this.loadAll();
            },
            (res: HttpErrorResponse) => {
                console.log('Error', res);
                swal('El Documento esta repetido en el Gestor');
            }
        );
    }
    // =================== Funciones necesario para la creacion de Dominio  =======================
    private subidaDocumento(result: any) {
        result.subscribe(
            (res: any) => console.log('correcto FEB', res),
            (res: HttpErrorResponse) => console.log('Eroro de subida OJO', res)
        );
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

    // // Para la craecion de Domonios OJO
    createCustomer() {
        this.dialog
            .open(CustomerCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearFile: IGearFiles) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearFile) {
                    console.log('entro en la creacion');
                    console.log('lo que se guardara', gearFile);

                    // Funcion de Creacion de Dominio
                    this.subscribeToSaveResponse(this.gearFilesService.create(gearFile));
                    console.log('elementos de Dominios', this.gearFiles);
                    // Fin de creacion de dominio

                    this.subject$.next(this.gearFiles);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    /**
     * End Funciones
     */

    /** Funcion para cargar la visualizacion de la pagina*/
    ngOnInit() {
        console.log('Entra al NgOnINit Doma');
        ///inicializacion de variables
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
        this.registerChangeInGearDomains();

        ////////////////////////////////////////////////////////////////////////////////
        //configuracion de formulario

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

        /**
         * Vertical Stepper
         * @type {FormGroup}
         */
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

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDomains() {
        this.eventSubscriber = this.eventManager.subscribe('gearDomainListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =================== Funciones necesario para la creacion de Dominio  =======================
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDomain>>) {
        result.subscribe((res: HttpResponse<IGearDomain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ====================== en esta Funcion se actuliza el componente ===============================

    updateCustomer(gearFile) {
        this.dialog
            .open(CustomerCreateUpdateComponent, {
                data: gearFile
            })
            .afterClosed()
            .subscribe(gearFile => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearFile) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearFilesService.update(gearFile));

                    const index = this.gearFiles.findIndex(existingCustomer => existingCustomer.id === gearFile.id);
                    // Actulizacion de la tabla
                    this.gearFiles[index] = gearFile;
                    this.subject$.next(this.gearFiles);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ====================== en esta Funcion se actuliza el componente ===============================

    // ====================== en esta Funcion se Elimina el componente ===============================
    deleteCustomer(customer) {
        // Eliminacion de Archivo OJO
        if (customer) {
            this.gearFilesService.delete(customer.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
            });
            this.gearFiles.splice(this.gearFiles.findIndex(existingCustomer => existingCustomer.id === customer.id), 1);
            this.subject$.next(this.gearFiles);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }
    // ====================== en esta Funcion se Elimina el componente ===============================

    // Redireccionar vista para crear preguntas del diagnostico
    listQuestion(idTipoDoc) {
        console.log('Id Dominio ', idTipoDoc);
        this.router.navigate(['/document-types'], { queryParams: { idDomain: idTipoDoc } });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //configuracion de formularo ojo

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
