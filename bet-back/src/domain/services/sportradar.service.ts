/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SportRadarIDRegions } from '../interfaces/sportradar.interface';
import { SportRadarConfigService } from '../../infrastructure/config/sportradar-config.service';

@Injectable()
export class SportRadarService {
  constructor(
    private readonly sportRadarConfigService: SportRadarConfigService,
    private readonly httpService: HttpService
  ) {}

  private getFullUrl(endpoint: string): string {
    return `${this.sportRadarConfigService.baseUrl}${endpoint}`;
  }

  async makeAuthenticatedRequest<T>(endpoint: string): Promise<any> {
    try {
      const headers = {
        'x-rapidapi-key': this.sportRadarConfigService.apiKey,
        'x-rapidapi-host': this.sportRadarConfigService.host,
      };

      const url = this.getFullUrl(endpoint);
      const response = await firstValueFrom(
        this.httpService.get<T>(url, { headers })
      );
      return response.data;
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Third API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getNFLCompetitions(): Promise<boolean> {
    try {
      const res = await this.makeAuthenticatedRequest(
        'nfl/official/trial/v7/en/games/2023/reg/schedule.xml'
      );
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getMatchesByTeamId(
    teamId: string,
    region = SportRadarIDRegions.EU
  ): Promise<any> {
    try {
      const res: any = await this.makeAuthenticatedRequest(
        `soccer/trial/v4/${region}/teams/${teamId}/results`
      );
      return res?.matches;
    } catch (error) {
      return false;
    }
  }

  async getTeamsByCompetitionId(
    competition_id: string,
    region = SportRadarIDRegions.EU
  ): Promise<any> {
    try {
      const res: any = await this.makeAuthenticatedRequest(
        `soccer/v4/${region}/competitions/${competition_id}/teams`
      );
      return res;
    } catch (error) {
      return false;
    }
  }

  async getSoccerCompetitions(region = SportRadarIDRegions.EU): Promise<any> {
    try {
      const res = await this.makeAuthenticatedRequest(
        `soccer/trial/v4/${region}/competitions.json`
      );
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getLast30MatchesByCompetitorId({
    competitor_id,
    format = 'json',
    language_code = 'en',
  }: any): Promise<any> {
    try {
      const res = await this.makeAuthenticatedRequest(
        `soccer/trial/v4/${language_code}/competitors/${competitor_id}/schedules.${format}`
      );
      return res.schedules;
    } catch (error) {
      return false;
    }
  }

  async getCompetitionsList(): Promise<{ id: string; name: string }[]> {
    const res = await this.makeAuthenticatedRequest(
      `soccer/trial/v4/en/competitions.json`
    );
    return res.competitions;
  }

  async getSeasons(): Promise<{ seasons: Array<any> }> {
    const res = await this.makeAuthenticatedRequest(
      `soccer/trial/v4/en/seasons.json`
    );
    return res.seasons;
  }

  async getSeasonCompetitors(season_id: string): Promise<any> {
    const res = await this.makeAuthenticatedRequest(
      `soccer/trial/v4/en/seasons/${season_id}/competitors.json`
    );

    return res.season_competitors;
  }

  async getMatchesByTeamName(team_name: string) {
    // FELIPE
    const res = await this.makeAuthenticatedRequest('');
    return res;
  }

  async searchTeamsByName(team_name: string): Promise<any> {
    const endpoint = `/teams?search=${team_name}`;
    const res = await this.makeAuthenticatedRequest(endpoint)
    return res.response;
  }
}
