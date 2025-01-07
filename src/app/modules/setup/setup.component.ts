/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../../services/competition.service';
import { Observable, of, switchMap, map, startWith } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

interface SelectPropsDef {
  id: string;
  name: string;
}

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
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
export class SetupComponent implements AfterViewInit {
  competitions: SelectPropsDef[] = [];
  teams: any;
  filterForm!: FormGroup;
  isLoading = false;
  seasons: Array<any> = [];
  filteredCompetitions!: Observable<SelectPropsDef[]> | any;
  filteredSeasons!: Observable<SelectPropsDef[]> | any;
  filteredTeams!: Observable<SelectPropsDef[]> | any;

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
    this.setupCompetitionAutocomplete();
    this.setupSeasonAutocomplete();
    this.setupTeamAutocomplete();
  }

  makeForms(): void {
    this.filterForm = new FormGroup({
      selectedCompetition: new FormControl(null, [Validators.required]),
      selectedTeam: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      selectedSeason: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  setupCompetitionAutocomplete() {
    this.filteredCompetitions = this.filterForm.get('selectedCompetition')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.competitions.slice();
      })
    );
  }

  private _filter(name: string): SelectPropsDef[] {
    const filterValue = name.toLowerCase();
    return this.competitions.filter(competition => 
      competition.name.toLowerCase().includes(filterValue)
    );
  }

  displayCompetition(competition: SelectPropsDef): string {
    return competition && competition.name ? competition.name : '';
  }

  getTeams(competitionId: string) {
    if (!competitionId) {
      this.filterForm.get('selectedTeam')?.disable();
      return of([]);
    }

    return this.competitionService.getTeamsByCompetitionId(competitionId);
  }

  getSeasons = () => this.competitionService.getSeasons();

  getSeasonCompetitors = (seasonId: string) =>
    this.competitionService.getSeasonCompetitors(seasonId);

  displaySeason(season: SelectPropsDef): string {
    return season && season.name ? season.name : '';
  }

  displayTeam(team: SelectPropsDef): string {
    return team && team.name ? team.name : '';
  }

  private _filterSeasons(name: string): SelectPropsDef[] {
    const filterValue = name.toLowerCase();
    return this.seasons.filter(season => 
      season.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTeams(name: string): SelectPropsDef[] {
    const filterValue = name.toLowerCase();
    return this.teams.filter((team: SelectPropsDef) => 
      team.name.toLowerCase().includes(filterValue)
    );
  }

  setupSeasonAutocomplete() {
    this.filteredSeasons = this.filterForm.get('selectedSeason')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterSeasons(name as string) : this.seasons.slice();
      })
    );
  }

  setupTeamAutocomplete() {
    this.filteredTeams = this.filterForm.get('selectedTeam')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterTeams(name as string) : this.teams?.slice();
      })
    );
  }

  setupFormSubscriptions(): void {
    // Competition selection subscription
    this.filterForm
      .get('selectedCompetition')
      ?.valueChanges.pipe(
        switchMap((competition: SelectPropsDef) => {
          if (competition?.id) {
            this.isLoading = true;
            return this.getSeasons();
          }
          return of([]);
        })
      )
      .subscribe((seasons) => {
        this.isLoading = false;
        this.seasons = seasons;
        const seasonControl = this.filterForm.get('selectedSeason');
        seasonControl?.setValue(null);
        seasonControl?.enable();
        this.setupSeasonAutocomplete();
      });

    // Season selection subscription
    this.filterForm
      .get('selectedSeason')
      ?.valueChanges.pipe(
        switchMap((season: SelectPropsDef) => {
          if (season?.id) {
            this.isLoading = true;
            return this.getSeasonCompetitors(season.id);
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
          this.setupTeamAutocomplete();
        }
      });
  }

}
