import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGearUser } from 'app/shared/model/gear-user.model';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Principal } from 'app/core';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './user-create-update.component.html',
    styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearOrganizationals: IGearOrganizationalUnit[]; // variable para el valor de la relacion
    gearUnit: any; // donde se alamcena el valor
    gearuser: any; // para el perfil
    gearstate: any; // para el estado
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    defaultSelectProfile: string; // variable que toma el valor que tiene antes de modificar.
    defaultSelectState: string; //
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    currentAccount: any;
    profileAccunt: any;

    // =======Variables para visualizar password==========
    inputType = 'password'; // tipo de campo (password)
    visible = false;
    // ===================================================

    // // ===========VARIABLES TOGGLE SLIDE========================
    // color = 'accent';
    // checked = false;
    // // ================================================

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    profiles = [
        { value: 'ROLE_ADMIN', name: 'Super Admin' },
        { value: 'ROLE_MANAGER', name: 'Manager' },
        { value: 'ROLE_CONSUL', name: 'Consultor' },
        { value: 'ROLE_USER', name: 'Usuario' }
    ];

    profilesTwo = [
        { value: 'ROLE_MANAGER', name: 'Manager' },
        { value: 'ROLE_CONSUL', name: 'Consultor' },
        { value: 'ROLE_USER', name: 'Usuario' }
    ];

    status = [{ id: 1, name: 'true' }, { id: 2, name: 'false' }];

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
        private fb: FormBuilder,
        private unitService: GearOrganizationalUnitService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private principal: Principal
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Unidad';
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.profileAccunt = this.currentAccount['authorities'];

            console.log('VALOR DE ROLE EN SESION', this.profileAccunt);

            /** Validar que cunado el usuario en sesion ROLE_MANAGER no pueda crear Usuario ROLE_ADMIN */
            if (this.profileAccunt !== 'ROLE_ADMIN') {
                this.profiles = this.profilesTwo;
            }
        });

        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearUser;
        }

        this.defaultSelect = this.defaults.gearOrganizationalUnitName; // se asigna variable que toma para la modificacion
        this.defaultSelectProfile = this.defaults.profile;
        this.defaultSelectState = this.defaults.state;
        this.form = this.fb.group({
            name: this.defaults.name || '',
            password: this.defaults.password || '',
            email: this.defaults.email || '',
            avatar: this.defaults.avatar || '',
            state: this.defaults.state || '',
            profile: this.defaults.profile || '',
            gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
            gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
        });

        // ===== Staer Carga valores de dominios en el actualizar =========================
        this.unitService.query().subscribe(
            (res: HttpResponse<IGearOrganizationalUnit[]>) => {
                this.gearOrganizationals = res.body;
                // ==== cargamos los valores =====
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    password: this.defaults.password || '',
                    email: this.defaults.email || '',
                    avatar: this.defaults.avatar || '',
                    state: this.defaults.state || '',
                    profile: this.defaults.profile || '',
                    gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
                    gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ===== End Carga valores en el actualizar =========================

        // ============ Start Condicion para validar  el label del select ============================
        // if (this.mode === 'create') {
        //     this.defaultSelect = this.route.snapshot.queryParams['nameUnit'];
        // } else {
        //     this.defaultSelect = this.defaults.gearOrganizationalUnitName; // se asigna variable que toma para la modificacion
        // }
        // ============ End Condicion para validar  el label del select ============================
    }

    // consulta la variable mode cargada por el boton
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    // Crear Usuarios
    createCustomer() {
        console.log('Modal crear');

        // ============== Guardado con Unidad Organizacional ======================
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        // ============== Guardado con Unidad Organizacional ======================

        // console.log('$$$$$$$$$', this.gearuser.name);
        //
        // this.form.value.profile = this.gearuser.name;
        console.log('@@@@', this.gearuser);
        console.log('2@@@@', this.gearstate);
        console.log('3@@@@@', this.form);

        // ======= Seto los valos asignados ojo importante ====
        this.form.value.profile = this.gearuser['value'];
        this.form.value.state = this.gearstate['name'];
        console.log('4@@@@@@', this.form);
        console.log('Guardado ', this.form.value.profile);
        //
        // this.form.value.state = this.gearstate.name;

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        console.log('Modal Actualizar');

        if (this.gearuser) {
            // asignacion para actualizar  el perfil
            console.log('@@@@@@@@@@@@@@@', this.gearuser.name);
            this.form.value.profile = this.gearuser.name;
            console.log('Actualizado ', this.form.value.profile);

            this.form.value.profile = this.gearuser['value'];
        } else {
            console.log('Antes ####### ', this.defaults.profile);
            this.form.value.profile = this.defaults.profile;
            console.log('Despues ####### ', this.defaults.profile);
        }

        /** */
        if (this.gearstate) {
            this.form.value.state = this.gearstate.name;
            this.form.value.state = this.gearstate['name'];
        } else {
            this.form.value.state = this.form.value.state;
        }

        // ====== Seto los valos asignados ojo importante ======

        console.log('VALUE gearuser ', this.gearuser);

        console.log('Guardado ', this.form.value.profile);

        const customer = this.form.value;
        customer.id = this.defaults.id;

        this.dialogRef.close(customer);
    }

    isCreateMode() {
        return this.mode === 'create';
    }

    isUpdateMode() {
        return this.mode === 'update';
    }

    // ==== Esta es para el llamado de Error al traer los dominios ======
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =======Funcion para visualizar password==========
    toggleVisibility() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
    // // ============== SLIDE TOGGLE=============================
    // changed(){
    //     console.log(this.checked)
    // }
}
