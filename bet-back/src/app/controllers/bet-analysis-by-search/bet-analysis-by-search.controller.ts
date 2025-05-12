import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class BetAnalysisBySearchController {

  @Get('matches')
  async getMatches(
    @Query('team_name') team_name: string
  ) {
    //TODO: Create a service called MatchService and retrieve all the matches based on the name of the team searched
    return;
  }
 
}
