import { AgmCoreModule } from '@agm/core';
import { NgModule, LOCALE_ID, Optional, SkipSelf } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/es';

import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions,
    MatIconRegistry,
    MatSnackBarConfig
} from '@angular/material';
import { environment } from '../../environments/environment';
import { PendingInterceptorModule } from '../shared/loading-indicator/pending-interceptor.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    imports: [
        HttpClientModule,
        // Displays Loading Bar when a Route Request or HTTP Request is pending
        PendingInterceptorModule,
        // Google Maps Module
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey
        }),
        // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
        LayoutModule
    ],
    exports: [],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'es'
        },
        DatePipe,
        MatIconRegistry,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            } as MatFormFieldDefaultOptions
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'bottom'
            } as MatSnackBarConfig
        }
    ]
})
export class GeargatewayCoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: GeargatewayCoreModule
    ) {
        registerLocaleData(locale);
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}
