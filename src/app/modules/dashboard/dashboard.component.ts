/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormControl, FormGroup } from '@angular/forms';
import { CompetitionService } from '../../services/competition.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  competitions: any;
  teams: any;
  filterForm!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.makeForms();
  }

  ngAfterViewInit(): void {
    this.competitions = this.route.snapshot.data['competitions'];
    this.teams = this.route.snapshot.data['teams'];
    console.log('competitions', this.competitions);
    console.log('teams', this.teams);
    
    this.setupFormSubscriptions();
  }

  makeForms() {
    this.filterForm = new FormGroup({
      selectedCompetition: new FormControl(null),
      selectedTeam: new FormControl(null),
    });
  }

  getTeams(competitionId: string) {
    console.log('getTeams', competitionId);
    // const competitionService = inject(CompetitionService); // Injeta serviços
    // return competitionService.getTeamsByCompetitionId(competitionId);
    return of(null);
  }

  setupFormSubscriptions(): void {
    this.filterForm
      .get('selectedCompetition')
      ?.valueChanges.pipe(
        switchMap((competitionId: string) => this.getTeams(competitionId))
      )
      .subscribe((teams) => {
        console.log('teams', teams);
        this.teams = teams;
        this.filterForm.get('selectedTeam')?.setValue(null);
      });
  }
}
