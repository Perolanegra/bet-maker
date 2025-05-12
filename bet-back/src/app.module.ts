import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SportRadarModule } from './domain/modules/sportradar.module';
import { BetAnalysisBySelectionController } from './app/controllers/bet-analysis-by-selection/bet-analysis-by-selection.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env['NODE_ENV'] === 'production',
      envFilePath: '.dev.env',
    }),
    SportRadarModule,
  ],
  controllers: [BetAnalysisBySelectionController],
  providers: [],
})
export class AppModule {}
