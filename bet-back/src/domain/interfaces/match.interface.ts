export interface Fixture {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
        first: number | null;
        second: number | null;
    };
    venue: {
        id: number;
        name: string;
        city: string;
    };
    status: {
        long: string;
        short: string;
        elapsed: number | null;
        extra: number | null;
    };
};

export interface Match {
    fixture: Fixture;
    league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
        round: string;
    };
    teams: {
        home: {
            id: number;
            name: string;
            logo: string;
            winner: boolean | null;
        };
        away: {
            id: number;
            name: string;
            logo: string;
            winner: boolean | null;
        };
    };
    goals: {
        home: number | null;
        away: number | null;
    };
    score: {
        halftime: {
            home: number | null;
            away: number | null;
        };
        fulltime: {
            home: number | null;
            away: number | null;
        };
        extratime: {
            home: number | null;
            away: number | null;
        };
        penalty: {
            home: number | null;
            away: number | null;
        };
    };
}

export interface FixtureStatisticsResponse {
    response: any
}

export interface FixtureResponse {
    get: string;
    parameters: {
        live: string;
    };
    errors: any[];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: Match[];
}