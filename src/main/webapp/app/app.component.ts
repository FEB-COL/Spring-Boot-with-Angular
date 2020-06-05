import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { SidenavItem } from './core/layout/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from './core/layout/sidenav/sidenav.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account, UserService } from 'app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

import { UserRouteAccessService } from 'app/core';

@Component({
    selector: 'fury-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // account: Account;
    // modalRef: NgbModalRef;
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

    authorities: any[];

    // ======== end variables propias de fury  =========

    constructor(
        sidenavService: SidenavService,
        // private principal: Principal, private loginModalService: LoginModalService, private eventManager: JhiEventManager
        public principal: Principal,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private userService: UserService
    ) {
        /** para el manejo de login */

        this.credentials = {};
        /** end login */

        const menu: SidenavItem[] = [];
        /**
         * Menu desplegable lateral
         */
        /** ============ Start Menu Dashboard ============== */
        menu.push({
            name: 'Dashboard',
            routeOrFunction: '/',
            icon: 'dashboard',
            position: 5,
            pathMatchExact: true
        });
        /** ============ end Menu Dashboard ============== */

        /** ============ Start Menu Administración ============== */
        const unit = {
            name: 'Gestor Unidad Organizacional',
            routeOrFunction: '/unit-organizational',
            position: 5
        };
        const dominios = {
            name: 'Gestor de Dominios',
            routeOrFunction: '/domains',
            position: 10
        };
        const users = {
            name: 'Gestor de Usuarios',
            routeOrFunction: '/gestor-usuarios',
            position: 15
        };
        /** Menu -> contiene los submenus*/
        menu.push({
            name: 'Administración',
            icon: 'donut_small',
            position: 10,
            subItems: [unit, dominios, users]
        });
        /** ============ End Menu Administración ============== */

        /** ============ Start Menu Dashboard ============== */
        menu.push({
            name: 'Decisión',
            routeOrFunction: '/decisions',
            icon: 'device_hub',
            position: 15,
            pathMatchExact: true
        });
        /** ============ end Menu Dashboard ============== */

        /** ============ Start Menu Generalidades ============== */
        // constantes -> submenu
        const cointype = {
            name: 'Tipo Monedas',
            routeOrFunction: '/cointypes',
            position: 5
        };

        const licencetype = {
            name: 'Tipo Licencias',
            routeOrFunction: '/licencetypes',
            position: 10
        };

        const systemtype = {
            name: 'Tipo Sistemas',
            routeOrFunction: '/systemtypes',
            position: 15
        };

        const documentLibrary = {
            name: 'Biblioteca Documentos',
            routeOrFunction: '/gear-library',
            position: 20
        };

        // Menu Generalidades
        menu.push({
            name: 'Generalidades',
            icon: 'chrome_reader_mode',
            position: 20,
            subItems: [cointype, licencetype, systemtype, documentLibrary]
        });
        /** ============ End Menu Generalidades ============== */

        /** ============ Start Menu Procesos ============== */
        // constantes -> submenu
        const categorie = {
            name: 'Categorías',
            routeOrFunction: '/categories',
            position: 5
        };

        // Menu Procesos
        menu.push({
            name: 'Admin Procesos',
            icon: 'format_indent_increase',
            position: 25,
            subItems: [categorie]
        });
        /** ============ End Menu Generalidades ============== */

        /** ============ Start Menu Sistemas de Infromacion ============== */
        // constantes -> submenu
        const informationsystem = {
            name: 'Sistemas de Información',
            routeOrFunction: '/informationsystems',
            position: 5
        };

        // Menu Procesos
        menu.push({
            name: 'Sistemas de Información',
            icon: 'web',
            position: 30,
            subItems: [informationsystem]
        });
        /** ============ End Menu Sistemas de Infromacion ============== */

        /** ============ Start Menu Procesos ============== */
        // constantes -> submenu
        const goal = {
            name: 'Estrategias',
            routeOrFunction: '/goals',
            position: 5
        };

        const diagram = {
            name: 'Diagrama',
            routeOrFunction: '/diagram',
            position: 10
        };

        // Menu Procesos
        menu.push({
            name: 'Estrategias',
            icon: 'assessment',
            position: 35,
            subItems: [goal, diagram]
        });
        /** ============ End Menu Generalidades ============== */

        /** ============ Start Menu Diagnostico ============== */
        // constantes -> submenu
        const diagnosis = {
            name: 'Diagnósticos',
            routeOrFunction: '/diagnosis',
            position: 5
        };

        // Menu Procesos
        menu.push({
            name: 'Gestión Diagnósticos',
            icon: 'equalizer',
            position: 40,
            subItems: [diagnosis]
        });
        /** ============ End Menu Diagnostico ============== */

        /** ============ Start Menu Portafolios ============== */
        // constantes -> submenu
        const portfolio = {
            name: 'Portafolios',
            routeOrFunction: '/portfolios',
            position: 5
        };

        // const project = {
        //     name: 'Proyectos',
        //     routeOrFunction: '/projects',
        //     position: 10
        // };
        //
        // const risk = {
        //     name: 'Riesgos',
        //     routeOrFunction: '/riskProjects',
        //     position: 15
        // };

        // Menu Procesos
        menu.push({
            name: 'Gestión Portafolios',
            icon: 'work',
            position: 40,
            subItems: [portfolio]
        });
        /** ============ End Menu Diagnostico ============== */

        /** ============ Start Menu Gestor Documental============== */
        // constantes -> submenu
        const Gestor = {
            name: 'Gestor Documetnal',
            routeOrFunction: '/gestor-documental',
            position: 5
        };

        menu.push({
            name: 'Gestión Documental',
            icon: 'library_books',
            position: 45,
            subItems: [Gestor]
        });
        /** ============ End Menu Gestor Documetal============== */

        /** ============ Start Menu Encuesta ============== */
        // constantes -> submenu
        const surveys = {
            name: 'Encuestas',
            routeOrFunction: '/surveys',
            position: 5
        };

        // Menu Gestor de Encuestas
        menu.push({
            name: 'Gestión Encuestas',
            icon: 'assignment',
            position: 50,
            subItems: [surveys]
        });
        /** ============ End Menu Diagnostico ============== */

        /** ============ Start Menu Dashboard ============== */
        menu.push({
            name: 'Wiki',
            routeOrFunction: '/gear-wiki',
            icon: 'dashboard',
            position: 55,
            pathMatchExact: true
        });
        /** ============ end Menu Dashboard ============== */

        // menu.push({
        //     name: 'Prueba ',
        //     routeOrFunction: '/prueba',
        //     icon: 'dashboard',
        //     position: 60,
        //     pathMatchExact: true
        // });

        // Send all created Items to SidenavService
        menu.forEach(item => sidenavService.addItem(item));
    }
    /** configuracion para la parte de jhiMainComponents*/

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

        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
            console.log('Autoridades', authorities);
            console.log('Autoridades Dos', this.authorities);
        });

        console.log('Autoridades Tres', this.authorities);
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
                // if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                //     console.log('@@@@@@@@@');
                this.router.navigate(['']);
                // }
                console.log('&&&&&&& continua');
                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = ''; // this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
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
