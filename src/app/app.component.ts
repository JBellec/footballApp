import { Component } from '@angular/core';

import { countriesLeague } from './models/countriesLeague.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedLeague!: countriesLeague;

  onSelectLeague(league: countriesLeague) {
      this.selectedLeague = league;
      console.log(`Selected league : ${this.selectedLeague.name}`);
    }
}
