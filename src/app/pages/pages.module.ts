
import { NgModule } from '@angular/core';



import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/share.module';
import { PAGES_ROUTES } from './pages.routes';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]



})

export class PagesModule { }