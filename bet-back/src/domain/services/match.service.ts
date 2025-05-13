import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamInfo } from '@domain/interfaces/team.interface';
import { Match } from '@domain/interfaces/match.interface';

@Injectable()
export class MatchService extends BaseService<any> {

  constructor(
    private readonly sportRadarService: SportRadarService
  ) {
    super(null as unknown as any); // Since we're not using a repository directly
  }

  async findByTeamName(teamName: string, season = null): Promise<Match[]> {
    try {
      const teamsInfo: TeamInfo[] =
        await this.sportRadarService.findTeamByName(teamName);

      const payload = {
        team: teamsInfo.at(0)?.team.id, // API force us to use a flow for retrieve specifically what we want, so i dont want to make any other requests to avoid paying more
        season: season ?? new Date().getFullYear().toString(),
        status: 'NS'
      }

      return this.sportRadarService.getMatchesByTeamId(payload);
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  }
}
