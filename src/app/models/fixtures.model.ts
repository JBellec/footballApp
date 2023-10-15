import { IFixtureResponse, IFixtureTeam, IGoals, IResponseFixtureRequest } from "./responseFixturesRequest.model";

export class Fixtures {
  home: Team;
  away: Team;
  constructor(home: Team, away: Team) {
    this.home = home;
    this.away = away;
  }
}

export class Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
  goal: number;
  constructor(id: number, name: string, logo: string, winner: boolean, goal: number) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.winner = winner;
    this.goal = goal;
  }
}