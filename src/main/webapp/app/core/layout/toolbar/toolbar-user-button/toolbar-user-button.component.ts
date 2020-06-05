import { Component, OnInit } from '@angular/core';
import { Principal, LoginService } from 'app/core';

@Component({
    selector: 'fury-toolbar-user-button',
    templateUrl: './toolbar-user-button.component.html',
    styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {
    isOpen: boolean;
    nameUser: any = 'user';

    constructor(private principal: Principal, private loginService: LoginService) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.nameUser = account['firstName'];
            console.log('NOMBRE DE USUSARIO EN SESION', this.nameUser);
        });
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    onClickOutside() {
        this.isOpen = false;
    }

    /** Cerrar Sesion*/
    logout() {
        console.log('ENTRO A CERRAR');

        /** Eliminar Cache de la sesion cerrada */
        location.reload(true);

        /** Funcion de cerrar Sesion */
        this.loginService.logout();
    }
}
