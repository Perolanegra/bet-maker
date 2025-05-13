import { Module } from '@nestjs/common';
import { MatchService } from '../services/match.service';
import { SportRadarModule } from './sportradar.module';
import { TeamService } from '@domain/services/team.service';

@Module({
  imports: [SportRadarModule],
  providers: [MatchService, TeamService],
  exports: [MatchService, TeamService]
})
export class MatchModule {}
