/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SportRadarConfigService } from '../../infrastructure/config/sportradar-config.service';
import {
  Fixture,
  FixtureResponse,
  FixtureStatisticsResponse,
  Match,
} from '@domain/interfaces/match.interface';
import { Team, TeamInfo, TeamStatistics, TeamStatisticsResponse } from '@domain/interfaces/team.interface';

@Injectable()
export class SportRadarService {
  constructor(
    private readonly sportRadarConfigService: SportRadarConfigService,
    private readonly httpService: HttpService
  ) {}

  private getFullUrl(endpoint: string): string {
    return `${this.sportRadarConfigService.baseUrl}${endpoint}`;
  }

  private async makeAuthenticatedRequest<T>(endpoint: string): Promise<T> {
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

  /**
   * Retrieves match information for multiple teams by their IDs
   * @param teams_ids team ID to fetch matches for
   * @returns Array of match objects if successful, false if the request fails
   */
  async getMatchesByTeamId({ team, season, status }: any): Promise<Match[]> {
    try {
      const res = await this.makeAuthenticatedRequest<FixtureResponse>(
        `fixture?team=${team}&season=${season}&status=${status}`
      );
      return res.response;
    } catch (error) {
      throw new HttpException(
        'Third API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getMatchStatsByFixtureId(
    fixtureId: number
  ): Promise<FixtureStatisticsResponse[]> {
    try {
      const res =
        await this.makeAuthenticatedRequest<FixtureStatisticsResponse>(
          `fixtures/statistics?fixture=${fixtureId}`
        );
      return res.response;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch match statistics',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getMatchStatsByTeamName(teamName: string): Promise<FixtureStatisticsResponse[]> {
    try {
      const teamsInfo = await this.findTeamByName(teamName);
      if (!teamsInfo.length) {
        throw new HttpException(
          'Team not found',
          HttpStatus.NOT_FOUND
        );
      }

      const teamId = teamsInfo[0].team.id;
      const matches = await this.getMatchesByTeamId({
        team: teamId,
        season: (new Date().getFullYear() - 1).toString(),
        status: 'NS'
      });

      if (!matches.length) {
        return [];
      }

      const fixtureId = matches[0].fixture.id;
      return await this.getMatchStatsByFixtureId(fixtureId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch match statistics by team name',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTeamStatistics(payload: { league: string, season: string, team: string }): Promise<TeamStatistics> {
    try {
      const endpoint = `/teams/statistics?league=${payload.league}&season=${payload.season}&team=${payload.team}`;
      const res = await this.makeAuthenticatedRequest<TeamStatisticsResponse>(endpoint);
      return res.response;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch team statistics',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findTeamByName(teamName: string): Promise<TeamInfo[]> {
    const endpoint = `/teams?name=${teamName}`;
    const res = await this.makeAuthenticatedRequest<any>(endpoint);
    return res.response;
  }
}
