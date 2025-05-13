export interface Team {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
}

export interface TeamVenue {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
}

export interface TeamInfo {
    venue: TeamVenue;
    team: Team
}

export interface TeamStatisticsResponse {
    response: TeamStatistics;
}

export interface TeamStatistics {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  form: string;
  fixtures: {
    played: {
      home: number;
      away: number;
      total: number;
    };
    wins: {
      home: number;
      away: number;
      total: number;
    };
    draws: {
      home: number;
      away: number;
      total: number;
    };
    loses: {
      home: number;
      away: number;
      total: number;
    };
  };
  goals: {
    for: {
      total: {
        home: number;
        away: number;
        total: number;
      };
      average: {
        home: string;
        away: string;
        total: string;
      };
      minute: {
        [key: string]: {
          total: number | null;
          percentage: string | null;
        };
      };
      under_over: {
        [key: string]: {
          over: number;
          under: number;
        };
      };
    };
    against: {
      total: {
        home: number;
        away: number;
        total: number;
      };
      average: {
        home: string;
        away: string;
        total: string;
      };
      minute: {
        [key: string]: {
          total: number | null;
          percentage: string | null;
        };
      };
      under_over: {
        [key: string]: {
          over: number;
          under: number;
        };
      };
    };
  };
  biggest: {
    streak: {
      wins: number;
      draws: number;
      loses: number;
    };
    wins: {
      home: string;
      away: string;
    };
    loses: {
      home: string;
      away: string;
    };
    goals: {
      for: {
        home: number;
        away: number;
      };
      against: {
        home: number;
        away: number;
      };
    };
  };
  clean_sheet: {
    home: number;
    away: number;
    total: number;
  };
  failed_to_score: {
    home: number;
    away: number;
    total: number;
  };
  penalty: {
    scored: {
      total: number;
      percentage: string;
    };
    missed: {
      total: number;
      percentage: string;
    };
    total: number;
  };
  lineups: Array<{
    formation: string;
    played: number;
  }>;
  cards: {
    yellow: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
    red: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
  };
}