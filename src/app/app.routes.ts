import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    redirectTo: 'setup',
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./modules/setup/setup.module').then(
        (m) => m.SetupModule
      ),
    pathMatch: 'full',
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./modules/dashboard/dashboard.module').then(
  //       (m) => m.DashboardModule
  //     ),
  //   pathMatch: 'full',
  // },
];
