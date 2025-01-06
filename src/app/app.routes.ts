import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    redirectTo: 'dashboard',
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    pathMatch: 'full',
  },
];
