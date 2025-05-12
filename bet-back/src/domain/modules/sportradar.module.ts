import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SportRadarService } from '../services/sportradar.service';
import { SportRadarConfigService } from '../../infrastructure/config/sportradar-config.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [SportRadarService, SportRadarConfigService],
  exports: [SportRadarService],
})
export class SportRadarModule {} 