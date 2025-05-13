import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BetAnalysisBySearchController } from '@application/controllers/bet-analysis-by-search/bet-analysis-by-search.controller';
import { BetAnalysisBySelectionController } from './application/controllers/bet-analysis-by-selection/bet-analysis-by-selection.controller';
import { MatchModule } from '@domain/modules/match.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env['NODE_ENV'] === 'production',
      envFilePath: '.dev.env',
    }),
    MatchModule
  ],
  controllers: [BetAnalysisBySelectionController, BetAnalysisBySearchController],
  providers: [],
})
export class AppModule {}
