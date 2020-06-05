import './vendor.ts';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import 'hammerjs'; // Needed for Touch functionality of Material Components
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GeargatewaySharedModule } from 'app/shared';
// import { GeargatewayCoreModule } from 'app/core';
// import { GeargatewayAppRoutingModule } from './app-routing.module'; // este modulo es como se nombre de forma antigua en JHIPSTER OJO
import { GeargatewayHomeModule } from './home/home.module';
import { GeargatewayAccountModule } from './account/account.module';
import { GeargatewayEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { RouterModule, Routes } from '@angular/router';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { DiagramaEstrategiaComponent } from './diagrama-estrategia/diagrama-estrategia.component';
// import { SideNavComponent } from './layouts/side-nav/side-nav.component';
// import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { GeargatewayCoreModule } from './core/core.module';
import { UserRouteAccessService } from './core/auth/user-route-access-service';
import { LoginModule } from './pages/custom-pages/login/login.module';
import { GeargatewayGearDomainModule } from './entities/gear-domain/gear-domain.module';
import { TestModule } from './pages/test/test.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginComponent } from './pages/custom-pages/login/login.component';
import { MaterialModule } from 'app/shared/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

import { Principal } from './core/auth/principal.service';
import { GearSurveySaveComponent } from './entities/gear-survey/gear-survey-save.component';
import { GearSurveyListComponent } from './entities/gear-survey/gear-survey-list.component';
import { GearSurveySolveComponent } from './entities/gear-survey/gear-survey-solve.component';
//test de importacion de modulo de permisos ojo con esta parte

//modulo para la graficacion de la ara;a
import { PlotlyModule, PlotlyViaCDNModule } from 'angular-plotly.js';
import { GearAranaComponent } from './entities/gear-arana/gear-arana.component';

@NgModule({
    /** Importacion de modulos*/
    imports: [
        //componentes del theme
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        // LoginModule,
        //Fin de componentes del tema

        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        GeargatewaySharedModule,
        GeargatewayCoreModule,
        GeargatewayHomeModule,
        GeargatewayAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GeargatewayEntityModule,
        //login
        LoginModule,
        DashboardModule,
        GeargatewayGearDomainModule,
        // LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        //Graficacion de la ara;a
        PlotlyModule,
        PlotlyViaCDNModule,
        // Angular Core Module // Don't remove!

        // Fury Core Modules
        // AppRoutingModule,
        // AppRoutingModule, //esta la forma antigua para la parte de ruteo ojo esta parte
        // Register a Service Worker (optional)
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    /** declaracion de funciones */
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        // SideNavComponent,
        DiagramaEstrategiaComponent,
        AppComponent,
        GearAranaComponent
        // GearSurveySaveComponent,
        // GearSurveyListComponent,
        // GearSurveySolveComponent
        //////////////////////////////////////////////////////////////
        // Configuracion de componentes de ruteo ojo con esto
        //////////////////////////////////////////////////////////////
        // LoginComponent
        // DashboardComponent
        //////////////////////////////////////////////////////////////
    ],
    /** funciones netamente typescript*/
    providers: [
        UserRouteAccessService,
        Principal,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    // esta componente genera erro por que tomo otro recorrido pero si debemos analizar los componentes que trae
    // [AppComponent]
    // [JhiMainComponent]
})
export class GeargatewayAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
