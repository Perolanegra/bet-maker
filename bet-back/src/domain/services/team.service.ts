import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamStatistics } from '@domain/interfaces/team.interface';

@Injectable()
export class TeamService extends BaseService<any> {
  constructor(
    private readonly sportRadarService: SportRadarService
  ) {
    super(null as unknown as any);
  }

  async getStatistics(payload: { league: string, season: string, team: string }): Promise<TeamStatistics> {
    try {
      return await this.sportRadarService.getTeamStatistics(payload);
    } catch (error) {
      console.error('Error finding team:', error);
      return {} as TeamStatistics;
    }
  }
}
