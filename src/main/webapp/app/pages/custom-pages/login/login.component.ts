import { ChangeDetectorRef, Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Account, Principal } from 'app/core';

@Component({
    selector: 'jhi-fury-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    account: Account;
    // Variables propias para el Login
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    // ======== start variables propias de fury  =========
    formulario: FormGroup; // Variable tipo de formulario.
    inputType = 'password'; // tipo de campo (password)
    visible = false;
    gearAutenticacion = false;
    // ======== end variables propias de fury  =========
    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        /** Validar que no esten vacios*/
        this.formulario = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.rememberMe = false;
        /**Fin de Configuracion*/
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        /** esta para la validacion de la cuenta ojo con esta parte */
        console.log('autenticacion DDDDDDDD', this.account);
        console.log('dddddddddddddddddddddddddd', this.isAuthenticated());
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
                console.log('LISTO CUENTA', this.account);
            });
        });
    }

    /**  Funcion para loguearse */
    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                console.log('url data -->', this.router);
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    console.log('@@@@@@@@@');
                    this.router.navigate(['/login']);
                }
                console.log('&&&&&&& continua');
                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                this.stateStorageService.storeUrl(null);
                if (redirect) {
                    this.router.navigate([redirect]);
                } else {
                    this.router.navigate(['']);
                }
            })
            .catch(() => {
                console.log('entro al error');
                this.authenticationError = true;
            });
    }

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
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
