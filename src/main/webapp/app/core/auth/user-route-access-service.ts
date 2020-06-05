import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private loginModalService: LoginModalService,
        private principal: Principal,
        private stateStorageService: StateStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.

        /** Redireccion a la URL*/
        return this.checkLogin(authorities, state.url);

        // // =========== HECHO POR  FABIAN ==============================
        // let aux = this.checkLogin(authorities, state.url);
        // console.log('este es el valor de ruteo ojo con esto@@@@@', aux);
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //
        // return false;
        // // ============================================================
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(
            principal.identity().then(account => {
                if (!authorities || authorities.length === 0) {
                    return true;
                }

                if (account) {
                    return principal.hasAnyAuthority(authorities).then(response => {
                        if (response) {
                            console.log('@@@@@@@@@true@@@@@@@  ', response);
                            return true;
                        }
                        if (isDevMode()) {
                            // console.error('User has not any of required authorities: ', authorities);
                            // console.log('RRRRRRRRRRRRRRRRR: ', authorities);
                            // alert('No tienes permiso para aaceder a este Modulo Consulte al Administrador')
                            swal({
                                position: 'center',
                                type: 'warning',
                                text: 'No tienes permiso para acceder a este Modulo, Consulte al Administrador!',
                                showConfirmButton: true
                            });
                        }
                        console.log('@@@@@@@@@false @@@@@@@');
                        return false;
                    });
                }

                this.stateStorageService.storeUrl(url);
                this.router.navigate(['accessdenied']).then(() => {
                    // only show the login dialog, if the user hasn't logged in yet
                    if (!account) {
                        // desativamos la apetura de login
                        // this.loginModalService.open();
                        //lo que enrutamos al login
                        console.log('entro al redirect de login ojo @@@@@@@@@@@@@@@@@@@@');
                        this.router.navigateByUrl('/login');
                    }
                });
                return false;
            })
        );
    }
}
