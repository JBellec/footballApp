import { Component } from '@angular/core';

import { ICountriesLeague } from '../models/countriesLeague.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  selectedLeague!: ICountriesLeague;

  onSelectLeague(league: ICountriesLeague) {
      this.selectedLeague = league;
    }
}