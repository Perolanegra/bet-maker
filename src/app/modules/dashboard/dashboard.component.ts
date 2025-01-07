/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../../services/competition.service';
import { of, switchMap } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(-20px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements AfterViewInit {
  competitions: any;
  teams: any;
  filterForm!: FormGroup;
  isLoading = false;
  seasons: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService
  ) {
    this.makeForms();
  }

  ngAfterViewInit(): void {
    this.competitions = this.route.snapshot.data['competitions'];
    this.teams = this.route.snapshot.data['teams'];
    this.setupFormSubscriptions();
  }

  makeForms() {
    this.filterForm = new FormGroup({
      selectedCompetition: new FormControl(null, [Validators.required]),
      selectedTeam: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      selectedSeason: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      last30Games: new FormControl({ value: false, disabled: false }),
    });
  }

  getTeams(competitionId: string) {
    if (!competitionId) {
      this.filterForm.get('selectedTeam')?.disable();
      this.filterForm.get('last30Games')?.disable();
      return of([]);
    }

    return this.competitionService.getTeamsByCompetitionId(competitionId);
  }

  getSeasons = () => this.competitionService.getSeasons();

  getSeasonCompetitors = (seasonId: string) =>
    this.competitionService.getSeasonCompetitors(seasonId);

  setupFormSubscriptions(): void {
    // Competition selection subscription
    this.filterForm
      .get('selectedCompetition')
      ?.valueChanges.pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.getSeasons();
        })
      )
      .subscribe((seasons) => {
        this.isLoading = false;
        this.seasons = seasons;
        const seasonControl = this.filterForm.get('selectedSeason');
        seasonControl?.setValue(null);
        seasonControl?.enable();
      });

    // Team selection subscription
    this.filterForm
      .get('selectedSeason')
      ?.valueChanges.pipe(
        switchMap((val) => {
          if (val) {
            this.isLoading = true;
            return this.getSeasonCompetitors(
              this.filterForm.get('selectedSeason')?.value
            );
          }
          return of([]);
        })
      )
      .subscribe((competitors) => {
        if (competitors.length > 0) {
          this.teams = competitors;
          this.isLoading = false;
          const teamControl = this.filterForm.get('selectedTeam');
          teamControl?.setValue(null);
          teamControl?.enable();
        }
      });
  }

  searchLast30Games() {
    const competitionId = this.filterForm.get('selectedCompetition')?.value;
    const teamId = this.filterForm.get('selectedTeam')?.value;

    if (competitionId && teamId) {
      // Implement the search logic here
      console.log('Searching last 30 games for:', { competitionId, teamId });
    }
  }
}
