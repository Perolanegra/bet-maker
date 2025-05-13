import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamInfo } from '@domain/interfaces/team.interface';

@Injectable()
export class MatchService extends BaseService<any> {

  constructor(
    private readonly sportRadarService: SportRadarService
  ) {
    super(null as unknown as any); // Since we're not using a repository directly
  }

  async findByTeamName(teamName: string): Promise<any[]> {
    try {
      const teamsInfo: TeamInfo[] =
        await this.sportRadarService.searchTeamsByName(teamName);
      const filteredTeamIds = teamsInfo.map(
        (teamInfo: TeamInfo) => teamInfo.team.id
      );

      const res = await this.sportRadarService.getMatchesByTeams(filteredTeamIds);
      const filteredMatches = res.map(item => item.fixture);

      return filteredMatches;
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  }
}
