import { Injectable } from '@nestjs/common';
import { TeamService } from '@domain/services/team.service';

@Injectable()
export class BetAnalysisBySearchService {
  constructor(private readonly teamService: TeamService) {}

  async getNextMatchTeamStatistics(league: string, teamId: string) {
    const teamStatistics = await this.teamService.getStatistics({ league, teamId });
    // TODO: grab that object and pass it to AI analyse.cle
  }
}
