import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SportRadarConfig } from './sportradar.config';

@Injectable()
export class SportRadarConfigService {
  constructor(private configService: ConfigService) {}

  get apiKey(): string | undefined {
    return (
      this.configService.get<string>('SPORTRADAR_API_KEY') ||
      SportRadarConfig.API_KEY
    );
  }

  get baseUrl(): string | undefined {
    return (
      this.configService.get<string>('SPORTRADAR_BASE_URL') ||
      SportRadarConfig.BASE_URL
    );
  }

  get apiVersion(): string | undefined {
    return (
      this.configService.get<string>('SPORTRADAR_API_VERSION') ||
      SportRadarConfig.API_VERSION
    );
  }

  get language(): string | undefined {
    return (
      this.configService.get<string>('SPORTRADAR_LANGUAGE') ||
      SportRadarConfig.LANGUAGE
    );
  }
}
