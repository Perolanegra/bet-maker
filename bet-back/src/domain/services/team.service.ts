import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SportRadarService } from './sportradar.service';
import { TeamStatistics } from '@domain/interfaces/team.interface';
import { MatchService } from './match.service';

@Injectable()
export class TeamService extends BaseService<any> {

  private readonly SEASON_END_DATE = '2025-05-31'; // TODO: this will die eventually, since we will be retrieved dynamicly the value calculated for curr season.
  private readonly SEARCH_LAST_GAME_AMOUNT = 5;

  private getCurrentSeason = (): string => {
    const today = new Date();
    const seasonEndDate = new Date(this.SEASON_END_DATE);
    return today > seasonEndDate ? '2025' : '2024';
  };

  constructor(
    private readonly sportRadarService: SportRadarService,
    private readonly matchService: MatchService
  ) {
    super(null as unknown as any);
  }

  /**
   * Retrieves team statistics
   * @param league - The league identifier
   * @param teamId - The team identifier
   * @returns Object containing last 5 match statistics and third-party API team statistics
   */
  async findStatistics(payload: { league: string, season: string, team: string }): Promise<TeamStatistics> {
    try {
      return await this.sportRadarService.getTeamStatistics(payload);
    } catch (error) {
      console.error('Error finding team:', error);
      return {} as TeamStatistics;
    }
  }

  /**
   * Retrieves comprehensive team statistics by combining last `${this.SEARCH_LAST_GAME_AMOUNT}` matches data with season statistics.
   * Unlike findStatistics() which only fetches raw statistics from third-party API,
   * this method enriches the data by:
   * 1. Getting the last `${this.SEARCH_LAST_GAME_AMOUNT}` matches statistics
   * 2. Combining it with team overall season statistics
   * 3. Returns a structured object containing both datasets for evaluation
   * 
   * @constant {number} SEARCH_LAST_GAME_AMOUNT - Number of last games to analyze
   * @param league - The league identifier
   * @param teamId - The team identifier
   * @returns Object containing both last `${this.SEARCH_LAST_GAME_AMOUNT}` match statistics and season-wide team statistics
   */
  async getStatistics({ league, teamId }: any) {
    const last5MatchStatistics = await this.matchService.getLastXStatistics(this.SEARCH_LAST_GAME_AMOUNT.toString());
    const teamStatistics: TeamStatistics =
      await this.findStatistics({
        league,
        season: this.getCurrentSeason(),
        team: teamId,
      });

    return { teamStatistics: { last5MatchStatistics, thirdApiTeamReportStatistics: teamStatistics } }
  }
}
