import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env['PORT'] || 3000,
  database: {
    url: process.env['DATABASE_URL'] || 'mongodb://localhost:27017/bet-maker',
  },
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-secret-key',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
  },
  sportradar: {
    apiKey: process.env['SPORTRADAR_API_KEY'],
    baseUrl: process.env['SPORTRADAR_BASE_URL'],
  },
}; 