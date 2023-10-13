import { Component, Input, OnChanges, inject } from '@angular/core';
import { Router } from '@angular/router';

import { countriesLeague } from 'src/app/models/countriesLeague.model';
import { leagueResult } from 'src/app/models/leagueResult.model';
import { IResponseLeagueRequest } from 'src/app/models/responseLeagueRequest.model';
import { FootballApiService } from 'src/app/services/football-api/football-api.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnChanges {
  @Input() league!: countriesLeague;
  
  season = new Date().getFullYear().toString();
  leagueResults: leagueResult[] = [];
  
  constructor(private footballService: FootballApiService) {}

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
