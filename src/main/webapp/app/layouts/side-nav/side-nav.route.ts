import { Route } from '@angular/router';

import { SideNavComponent } from './side-nav.component';

export const sideNavRoute: Route = {
    path: '',
    component: SideNavComponent,
    outlet: 'navbar'
};
