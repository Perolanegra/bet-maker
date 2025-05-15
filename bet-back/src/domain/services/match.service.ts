import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamInfo } from '@domain/interfaces/team.interface';
import {
  FixtureStatistics,
  Match,
} from '@domain/interfaces/match.interface';

@Injectable()
export class MatchService extends BaseService<any> {


  constructor(
    private readonly sportRadarService: SportRadarService,
  ) {
    super(null as unknown as any); // Since we're not using a repository directly
  }

  /**
   * Finds matches by team name
   * @param teamName - The name of the team to search for
   * @param season - Optional season parameter, defaults to current year if not provided
   * @returns Array of Match objects containing match information for the specified team
   */
  async findByTeamName(teamName: string, season = null): Promise<Match[]> {
    const teamsInfo: TeamInfo[] = await this.sportRadarService.findTeamByName(
      teamName
    );

    const payload = {
      team: teamsInfo.at(0)?.team.id, // API force us to use a flow for retrieve specifically what we want, so i dont want to make any other requests to avoid paying more
      season: season ?? new Date().getFullYear().toString(),
      status: 'NS',
    };

    return await this.sportRadarService.getMatchesByTeamId(payload);
  }

  async getLastXStatistics(X: string) {
    // we dont need try catches here since we are handling errors with a middleware.
    const last5Games: Match[] = await this.sportRadarService.getLastXGames(X);

    if (!last5Games?.length) {
      return {};
    }

    const fixturesIds: number[] = last5Games.map(
      (match: Match) => match.fixture.id
    );

    const lastXMatchStatistics: { fixture: FixtureStatistics[] }[] =
      await Promise.all(
        fixturesIds.map(async (fixtureId: number) => {
          return { fixture: await this.sportRadarService.getMatchStatsByFixtureId(fixtureId) };
        })
      );


    return lastXMatchStatistics;
  }

  async getFixtureStatistics({
    fixtureId,
    amountMatchesToFilter,
    teamId,
  }: any) {
    try {
      const res = await this.sportRadarService.getMatchStatsByFixtureId(
        fixtureId
      );
      return res;
    } catch (error) {
      console.error('Error getting fixture statistics:', error);
      return [];
    }
  }
}
