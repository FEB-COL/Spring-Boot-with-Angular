/**
 * Servicio de Login.
 */
import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
    // Declaracion del construtor
    constructor(private principal: Principal, private authServerProvider: AuthServerProvider, private router: Router) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    console.log('entro para la parte de autorizacion');
                    this.principal.identity(true).then(account => {
                        console.log('entro en el idientity', data);
                        resolve(data);
                    });
                    console.log('salio por error');
                    return cb();
                },
                err => {
                    console.log('entro en el error');
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        // si sale error enrutar automaticamente a Login
        this.router.navigate(['/login']);
    }
}
