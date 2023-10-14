import { Component, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICountriesLeague } from 'src/app/models/countriesLeague.model';
import { LeagueResult } from 'src/app/models/leagueResult.model';
import { IResponseLeagueRequest } from 'src/app/models/responseLeagueRequest.model';
import { StandingStoreService } from 'src/app/services/standings-store/standing-store.service';
import { StandingsService } from 'src/app/services/standings/standings.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnChanges, OnInit, OnDestroy {
  
  @Input() league!: ICountriesLeague;
  
  season = new Date().getFullYear().toString();
  leagueResults: LeagueResult[] = [];
  subs!: Subscription;
  
  private standingsService = inject(StandingsService);
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
    this.subs = this.standingsService
      .getStandingsLeague(leagueId, season)
      .subscribe((res: IResponseLeagueRequest) => {
          if(res!.response.length > 0){
            this.leagueResults = this.standingsService.mapIStandingsToLeagueResult(
              res!.response[0]!.league!.standings[0]
            );
          }        
        return LeagueResult;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
