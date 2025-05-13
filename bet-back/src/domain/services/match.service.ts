import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamInfo } from '@domain/interfaces/team.interface';
import { Match } from '@domain/interfaces/match.interface';
import { TeamService } from './team.service';

@Injectable()
export class MatchService extends BaseService<any> {

  constructor(
    private readonly sportRadarService: SportRadarService,
    private readonly teamService: TeamService
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

      return await this.sportRadarService.getMatchesByTeamId(payload);
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  }

  async getNextStatisticsByTeamId(teamId: number) {
    try {

      //TOOD: primeiro obter os ultimos 5jogos, pega os ids fixture e traz as estatística de todos os jogos, e guarda essa informação;
      // logo depois obter o teams statistics passando o teamId
      const res = this.teamService.getStatistics(null);
    } catch (error) {
      console.log()
    }
  }

  async getFixtureStatistics({ fixtureId, amountMatchesToFilter, teamId }: any) {
    try {
      const res = await this.sportRadarService.getMatchStatsByFixtureId(fixtureId);
      return res;
    } catch (error) {
      console.error('Error getting fixture statistics:', error);
      return [];
    }
  }
}
