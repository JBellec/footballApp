import { Component, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { Leagues } from '../../models/countriesLeague.model';
import { Standings } from '../../models/standings.model';
import { IResponseStandingsRequest } from '../../models/responseStandingsRequest.model';
import { StandingStoreService } from '../../services/standings-store/standing-store.service';
import { StandingsService } from '../../services/standings/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnChanges, OnInit, OnDestroy {
  
  @Input() league!: Leagues;
  
  season = new Date().getFullYear().toString();
  leagueResults: Standings[] = [];
  subs!: Subscription;
  
  private standingsService = inject(StandingsService);
  private standingStoreService = inject(StandingStoreService);

  ngOnInit(): void {
    var storedStanding = this.standingStoreService.getSelectedStanding();
    if(storedStanding !==0){
      this.getStandingsData(storedStanding, this.season);
    }
  }

  ngOnChanges(): void {
    if(this.league){
      this.getStandingsData(this.league.id, this.season);
      this.standingStoreService.setSelectedStanding(this.league.id);
    }
  }

  private getStandingsData(leagueId: number, season: string) {
    this.subs = this.standingsService
      .getStandingsLeague(leagueId, season)
      .subscribe((res: IResponseStandingsRequest) => {
          if(res!.response.length > 0){
            this.leagueResults = this.standingsService.mapIStandingsToLeagueResult(
              res!.response[0]!.league!.standings[0]
            );
          }        
        return Standings;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
