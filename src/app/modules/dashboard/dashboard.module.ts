import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getCompetitionsResolver } from '../../resolvers/competitions.resolver';
import { CompetitionService } from '../../services/competition.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('./dashboard.component').then((c) => c.DashboardComponent),
        resolve: {
          competitions: getCompetitionsResolver,
        },
        providers: [CompetitionService],
      },
    ]),
  ],
})
export class DashboardModule {}
