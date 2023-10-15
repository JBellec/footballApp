export interface IResponseLeaguesRequest {
    get: string;
    results: number;
    response: Array<ILeaguesResponse>;
}

export interface ILeaguesResponse {
    league: ILeagues;
    country: ICountry;
    seasons: ISeasons[];
}

export interface ILeagues {
    id: number;
    name: string;
    type: string;
    logo: string;
}

export interface ICountry {
    name: string;
    code: string;
    flag: string;
}

export interface ISeasons {
    year: number;
    start: string;
    end: string;
    current: boolean;
}