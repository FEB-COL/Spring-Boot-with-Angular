import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal } from 'app/core';
import { GearGestionUsuariosService } from './gear-gestion-usuarios.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { UserCreateUpdateComponent } from './modalsUser/user-create-update.component';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';
import { IGearUser } from 'app/shared/model/gear-user.model';
import { IGearDomain } from 'app/shared/model/gear-domain.model';

@Component({
    selector: 'jhi-gear-gestion-usuarios',
    templateUrl: './gear-gestion-usuarios.component.html',
    styleUrls: ['./gear-gestion-usuarios.component.scss']
})
export class GearGestionUsuariosComponent implements OnInit, AfterViewInit, OnDestroy {
    /** toma los  datos para pasarlos al html */
    dataSource: MatTableDataSource<IGearUser>; // Array de la interface

    gearUsers: IGearUser[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: boolean; // Variables para la creacion-Eliminacion y Edicion

    // ======================= Variables para el filtadro por Unidad ============
    usersByUnits: IGearDomain[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    /** Variables que utilizar el theme */
    subject$: ReplaySubject<IGearUser[]> = new ReplaySubject<IGearUser[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearUser[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar

    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Usuario', property: 'avatar', visible: true, isModelProperty: true },
        { name: 'Password', property: 'password', visible: false, isModelProperty: true },
        { name: 'Nombre Usuario', property: 'name', visible: true, isModelProperty: true },
        { name: 'Email', property: 'email', visible: true, isModelProperty: true },
        { name: 'Estado', property: 'state', visible: true, isModelProperty: true },
        { name: 'Perfil', property: 'profile', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private gearGestionUsuariosService: GearGestionUsuariosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private dialog: MatDialog // Componente Necesario para la parte de Login
    ) {}

    // Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');
        // // ============================== Usuarios Generales======================================
        // this.gearGestionUsuariosService.query().subscribe(
        //     (res: HttpResponse<IGearUser[]>) => {
        //         this.gearUsers = res.body;
        //
        //         // cargar el arreglo a la variable
        //         const users = this.gearUsers;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(users);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //
        //         console.log('Domain traido de BD', this.gearUsers);
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // // ============================== Usuarios Generales======================================

        // ============================== Usuarios por Unidad Organizacional ======================================
        this.gearGestionUsuariosService.usersByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.usersByUnits = res;

            // cargar el arreglo a la variable
            const usersUnit = this.usersByUnits;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(usersUnit);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.usersByUnits);
        });
        // ============================== Usuarios por Unidad Organizacional======================================
    }

    ngOnInit() {
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
        this.registerChangeInGearUsers();
    }

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
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

    /** End Funciones */

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearUsers() {
        this.eventSubscriber = this.eventManager.subscribe('gearUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =================== Funciones necesario para la creacion  =======================
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearUser>>) {
        result.subscribe((res: HttpResponse<IGearUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ====================== en esta Funcion se actuliza el componente ===============================

    createUser() {
        this.dialog
            .open(UserCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearUser: IGearUser) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearUser) {
                    console.log('entro en la creacion');
                    console.log('lo que se guardara', gearUser);

                    // Funcion de Creacion de Dominio
                    this.subscribeToSaveResponse(this.gearGestionUsuariosService.create(gearUser));
                    console.log('elementos de Dominios', this.usersByUnits);
                    // Fin de creacion de dominio

                    this.subject$.next(this.usersByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Creado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }

    updateUser(gearUser) {
        this.dialog
            .open(UserCreateUpdateComponent, {
                data: gearUser
            })
            .afterClosed()
            .subscribe(gearUser => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearUser) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearGestionUsuariosService.update(gearUser));

                    const index = this.usersByUnits.findIndex(existingCustomer => existingCustomer.id === gearUser.id);
                    // Actulizacion de la tabla
                    this.usersByUnits[index] = gearUser;
                    this.subject$.next(this.usersByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Actualizado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }

    // ====================== en esta Funcion se actuliza el componente ===============================

    // ====================== en esta Funcion se Elimina el componente ===============================
    deleteUser(gearUser) {
        const aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (gearUser) {
            this.gearGestionUsuariosService.delete(gearUser.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
            });
            this.usersByUnits.splice(this.usersByUnits.findIndex(existingCustomer => existingCustomer.id === gearUser.id), 1);
            this.subject$.next(this.usersByUnits);
            this.ngOnInit();
            this.loadAll();
            swal({
                position: 'center',
                type: 'success',
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
    // ====================== en esta Funcion se Elimina el componente ===============================
}
