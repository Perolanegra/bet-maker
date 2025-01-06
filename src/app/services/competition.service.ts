/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable()
export class CompetitionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(`${this.apiUrl}/competitions`);
  }

  getCompetitorSchedules(competitorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/competitor-schedules`, {
      params: { competitor_id: competitorId }
    });
  }

  getMatches(teamId: string, region?: string): Observable<any> {
    const params: any = { team_id: teamId };
    if (region) {
      params.region = region;
    }
    return this.http.get<any>(`${this.apiUrl}/matches`, { params });
  }

  getTeamsByCompetitionId(competitionId: string, region?: string): Observable<any> {
    const params: any = { competition_id: competitionId };
    if (region) {
      params.region = region;
    }
    return this.http.get<any>(`${this.apiUrl}/teams`, { params });
  }
}
