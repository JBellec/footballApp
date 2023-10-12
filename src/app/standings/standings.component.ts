import { Component, Input, OnChanges, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FootballApiService } from '../services/football-api/football-api.service';
import { countriesLeague } from '../models/countriesLeague.model';
import { leagueResult } from '../models/leagueResult.model';
import { IResponseLeagueRequest } from '../models/responseLeagueRequest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnChanges {
  @Input() league!: countriesLeague;

  season = new Date().getFullYear().toString();
  leagueResults: leagueResult[] = [];
  
  constructor(private router: Router, private footballService: FootballApiService) {}

  viewTeamDetails(idTeam: number) {
    this.router.navigate(['/team-details', idTeam]);
  }

  ngOnChanges(): void {
    if(this.league){
      this.footballService
      .getResponseLeague(this.league.id, this.season)
      .subscribe((res: IResponseLeagueRequest) => {
        this.leagueResults = this.footballService.mapIStandingsToLeagueResult(
          res!.response[0].league.standings[0]
        );
        return leagueResult;
      });
    }
  }
}
