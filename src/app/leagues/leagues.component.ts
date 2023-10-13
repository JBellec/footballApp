import { Component } from '@angular/core';

import { countriesLeague } from '../models/countriesLeague.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  selectedLeague!: countriesLeague;

  onSelectLeague(league: countriesLeague) {
      this.selectedLeague = league;
      console.log(`Selected league : ${this.selectedLeague.name}`);
    }
}