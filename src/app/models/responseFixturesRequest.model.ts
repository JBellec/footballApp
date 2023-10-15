import { ILeague } from './responseStandingsRequest.model';

export interface IResponseFixtureRequest {
  get: string;
  results: number;
  response: Array<IFixtureResponse>;
}

export interface IFixtureResponse {
  league: ILeague;
  teams: ITeams;
  goals: IGoals;
}

export interface ITeams {
  home: IFixtureTeam;
  away: IFixtureTeam;
}

export interface IFixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface IGoals {
  home: number;
  away: number;
}
