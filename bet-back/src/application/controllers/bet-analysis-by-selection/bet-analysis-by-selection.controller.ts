import { Controller, Get, Query } from '@nestjs/common';
import { MatchService } from '@domain/services/match.service';

@Controller()
export class BetAnalysisBySelectionController {
  constructor(private readonly matchService: MatchService) { }

  @Get('matches')
  getMatches(
    @Query('teamName') teamName: string
  ) {
    return this.matchService.findByTeamName(teamName);
  }


}
