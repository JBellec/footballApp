export class LeagueResult {
  rank: number;
  logo: string;
  name: string;
  games: number;
  win: number;
  lose: number;
  draw: number;
  goalDifference: number;
  points: number;
  idTeam: number;
  constructor(
    rank: number,
    logo: string,
    name: string,
    games: number,
    win: number,
    lose: number,
    draw: number,
    goalDifference: number,
    points: number,
    idTeam: number
  ) {
    this.rank = rank;
    this.logo = logo;
    this.name = name;
    this.games = games;
    this.win = win;
    this.lose = lose;
    this.draw = draw;
    this.goalDifference = goalDifference;
    this.points = points;
    this.idTeam = idTeam;
  }
}
