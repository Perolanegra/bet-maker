import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.DEFAULT })
export class SportRadarConfigService {
  constructor(private configService: ConfigService) {}

  get apiKey(): string | undefined {
    return this.configService.get<string>('SPORTRADAR_API_KEY');
  }

  get baseUrl(): string | undefined {
    return this.configService.get<string>('SPORTRADAR_BASE_URL');
  }

  get apiVersion(): string | undefined {
    return this.configService.get<string>('SPORTRADAR_API_VERSION');
  }

  get language(): string | undefined {
    return this.configService.get<string>('SPORTRADAR_LANGUAGE');
  }

  get host(): string | undefined {
    return this.configService.get<string>('SPORTRADAR_API_HOST');
  }
}
