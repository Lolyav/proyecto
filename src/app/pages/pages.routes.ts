import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { LoginGuardGuard } from '../services/service.index';









const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

        ]
    }
];



export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
