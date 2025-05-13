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
  ) { }

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
      return response;
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

  /**
   * Retrieves match information for multiple teams by their IDs
   * @param teams_ids Array of team IDs to fetch matches for
   * @returns Array of match objects if successful, false if the request fails
   */
  async getMatchesByTeams(teamsIds: number[]): Promise<Array<any>> {
    try {
      const res: any = await this.makeAuthenticatedRequest(`fixture?ids=${teamsIds.join('-')}`);
      return res?.response;
    } catch (error) {
      throw new HttpException(
        'Third API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async searchTeamsByName(teamName: string): Promise<any> {
    const endpoint = `/teams?search=${teamName}`;
    const res = await this.makeAuthenticatedRequest(endpoint)
    return res.response;
  }
}
