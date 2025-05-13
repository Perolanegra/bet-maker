import { Module } from '@nestjs/common';
import { MatchService } from '../services/match.service';
import { SportRadarModule } from './sportradar.module';

@Module({
  imports: [SportRadarModule],
  providers: [MatchService],
  exports: [MatchService]
})
export class MatchModule {}
