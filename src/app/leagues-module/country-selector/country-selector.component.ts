import { Component, Output, EventEmitter, OnInit, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LeaguesService } from '../../services/leagues/leagues.service';
import { IResponseLeaguesRequest } from '../../models/responseLeaguesRequest.model';
import { Leagues } from '../../models/countriesLeague.model';
import { countriesList } from '../../config/api.config';


@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit, OnDestroy {
  
  @Output() selectedLeague = new EventEmitter<Leagues>();

  leagues: Leagues[] = [];

  private leaguesService = inject(LeaguesService);
  subs!: Subscription;

  selectLeague(league: Leagues) {
    this.selectedLeague.emit(league);
  }

  ngOnInit(): void {

    for (var country of countriesList) {
      this.subs = this.leaguesService
        .getLeagues(country.name, country.leagueName)
          .subscribe((res: IResponseLeaguesRequest) => {
            if(res!.response.length > 0){
              this.leagues.push(this.leaguesService.mapILeaguesToICountriesLeague(res!.response[0]));
            }
          });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
