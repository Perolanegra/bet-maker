import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/controllers/app.controller';
import { SportRadarModule } from './domain/modules/sportradar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env['NODE_ENV'] === 'production',
      envFilePath: '.dev.env',
    }),
    SportRadarModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
