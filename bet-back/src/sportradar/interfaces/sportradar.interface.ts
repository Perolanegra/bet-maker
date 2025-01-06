export interface SportRadarResponse<T> {
  status: number;
  data: T;
}

export interface SportRadarError {
  code: string;
  message: string;
  description?: string;
}

export interface SportRadarAuthStatus {
  authenticated: boolean;
  remainingCalls?: number;
}

export enum SportRadarIDLeagues {
  UEFA_EURO = 'sr:competition:1',
  UEFA_CHAMPIONS_LEAGUE = 'sr:competition:7',
  PREMIER_LEAGUE = 'sr:competition:17',
  LA_LIGA = 'sr:competition:8',
  CHALLENGER_PRO_LEAGUE = 'sr:competition:9',
  FIFA_WORLD_CUP_QUALIFICATION_UEFA = 'sr:competition:11',
  FIFA_WORLD_CUP_QUALIFICATION_CAF = 'sr:competition:13',
  BRASILEIRAO_A = 'sr:competition:325',
  BRASILEIRAO_B = 'sr:competition:390',
  BRASILEIRAO_C = 'sr:competition:1281',
  BRASILEIRAO_D = 'sr:competition:15335',
  CHINESE_SUPER_LEAGUE = 'sr:competition:649',
}

export enum SportRadarIDRegions {
  AM = 'am',
  EU = 'eu',
}

export interface SportRadarTeam {
  id: string;
  name: string;
  country: string;
  country_code: string;
  abbreviation: string;
  qualifier: string;
  gender: string;
}

export enum SportRadarTeamCodeAbreviation {
  LIVERPOOL = 'LFC',
  WEST_HAM_UNITED = 'WHU',
  MANCHESTER_CITY = 'MCI',
  MANCHESTER_UNITED = 'MUN',
  LEICESTER_CITY = 'LEI',
  TOTTENHAM_HOTSPUR = 'TOT',
  BRENTFORD = 'BRENT',
  WOLVES = 'WLV',
}
