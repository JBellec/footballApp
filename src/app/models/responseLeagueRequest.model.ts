export interface IResponseLeagueRequest {
  get: string;
  results: number;
  response: Array<IResponse>;
}

export interface IResponse {
  league: ILeague;
}

export interface ILeague {
  id: 39;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Array<IStandings>>;
}

export interface IStandings {
  rank: number;
  team: ITeam;
  points: number;
  goalsDiff: number;
  all: IAll;
}

export interface ITeam {
  id: number;
  name: string;
  logo: string;
}

export interface IAll {
  played: number;
  win: number;
  draw: number;
  lose: number;
}
