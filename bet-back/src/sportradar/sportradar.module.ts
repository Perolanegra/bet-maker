import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SportRadarService } from './services/sportradar.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [SportRadarService],
  exports: [SportRadarService],
})
export class SportRadarModule {} 