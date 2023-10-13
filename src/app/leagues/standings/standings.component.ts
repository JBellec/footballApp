import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';

import { countriesLeague } from 'src/app/models/countriesLeague.model';
import { LeagueResult } from 'src/app/models/leagueResult.model';
import { IResponseLeagueRequest } from 'src/app/models/responseLeagueRequest.model';
import { FootballApiService } from 'src/app/services/football-api/football-api.service';
import { StandingStoreService } from 'src/app/services/standing-store/standing.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnChanges, OnInit {
  
  @Input() league!: countriesLeague;
  
  season = new Date().getFullYear().toString();
  leagueResults: LeagueResult[] = [];
  
  private footballService = inject(FootballApiService);
  private standingStoreService = inject(StandingStoreService);

  ngOnInit(): void {
    var storedStanding = this.standingStoreService.getSelectedStanding();
    if(storedStanding !==''){
      this.getStandingsData(storedStanding, this.season);
    }
  }

  ngOnChanges(): void {
    if(this.league){
      this.getStandingsData(this.league.id, this.season);
      this.standingStoreService.setSelectedStanding(this.league.id);
    }
  }

  private getStandingsData(leagueId: string, season: string) {
    this.footballService
      .getStandingsLeague(leagueId, season)
      .subscribe((res: IResponseLeagueRequest) => {
        this.leagueResults = this.footballService.mapIStandingsToLeagueResult(
          res!.response[0].league.standings[0]
        );
        return LeagueResult;
      });
  }
}
