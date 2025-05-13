import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { Team, TeamInfo } from '@domain/interfaces/team.interface';

@Injectable()
export class MatchService extends BaseService<any> {

  constructor(
    private readonly sportRadarService: SportRadarService
  ) {
    super(null as unknown as any); // Since we're not using a repository directly
  }

  async findByTeamName(teamName: string, season = null): Promise<any[]> {
    try {
      const teamsInfo: TeamInfo[] =
        await this.sportRadarService.findTeamByName(teamName);

      const payload = {
        team: teamsInfo.at(0)?.team.id,
        season: season ?? new Date().getFullYear().toString(),
        status: 'NS'
      }

      const res = await this.sportRadarService.getMatchesByTeamId(payload);
      const filteredMatches = res.map(item => item.fixture);

      return filteredMatches;
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  }
}
