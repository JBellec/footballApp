import { IFixtureResponse, IFixtureTeam, IGoals, IResponseFixtureRequest } from "./responseFixturesRequest.model";

export class Fixtures{
    home: Team;
    away: Team;
    constructor(home: Team, away: Team){
        this.home = home;
        this.away = away;
    }
    static fromApiResponse(fixtureResponse: IFixtureResponse): Fixtures {
        var homeTeam: Team = Team.fromFixtureTeam(fixtureResponse.teams.home, fixtureResponse.goals.home);
        var awayTeam: Team = Team.fromFixtureTeam(fixtureResponse.teams.away, fixtureResponse.goals.away);
    
        return new Fixtures(homeTeam, awayTeam);
      }
}

export class Team{
    id: number;
    name: string;
    logo: string;
    winner: boolean;
    goal: number;
    constructor(id: number, name: string, logo: string, winner: boolean, goal: number){
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.winner = winner;
        this.goal = goal;
    }

    static fromFixtureTeam(fixtureTeam: IFixtureTeam, fixtureGoal: number): Team {
        return new Team(
          fixtureTeam.id,
          fixtureTeam.name,
          fixtureTeam.logo,
          fixtureTeam.winner,
          fixtureGoal
        );
      }
}