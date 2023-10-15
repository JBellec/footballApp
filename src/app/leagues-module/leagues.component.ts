import { Component } from '@angular/core';

import { Leagues } from '../models/countriesLeague.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  selectedLeague!: Leagues;

  onSelectLeague(league: Leagues) {
      this.selectedLeague = league;
    }
}