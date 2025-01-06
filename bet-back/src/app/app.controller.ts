import { Controller, Get, Query } from '@nestjs/common';
import { SportRadarService } from '../sportradar/services/sportradar.service';
import { SportRadarIDRegions } from '../sportradar/interfaces/sportradar.interface';

@Controller()
export class AppController {
  constructor(private readonly sportRadarService: SportRadarService) {}

  @Get('matches')
  async getMatches(
    @Query('team_id') team_id: string,
    @Query('region') region: string
  ) {
    const isConnected = await this.sportRadarService.getMatchesByTeamId(
      team_id,
      region as SportRadarIDRegions
    );
    return { isConnected };
  }

  @Get('competitions')
  async getCompetitions() {
    return await this.sportRadarService.getCompetitionsList();
  }

  @Get('competitor-schedules')
  async getCompetitorSchedules(@Query('competitor_id') competitor_id: string) {
    return await this.sportRadarService.getLast30MatchesByCompetitorId({
      competitor_id,
    });
  }

  @Get('teams')
  async getTeamsByCompetitionId(
    @Query('competition_id') competition_id: string,
    @Query('region') region: string
  ) {
    return await this.sportRadarService.getTeamsByCompetitionId(
      competition_id,
      region as SportRadarIDRegions
    );
  }
}
