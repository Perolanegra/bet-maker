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