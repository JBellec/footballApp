import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';

import { LeaguesService } from '../services/leagues/leagues.service';
import { countriesLeague } from '../models/countriesLeague.model';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit {
  @Output() selectedLeague = new EventEmitter<countriesLeague>();

  leagues: countriesLeague[] = [];

  private leaguesService = inject(LeaguesService);

  ngOnInit(): void {
    this.leaguesService
      .getAll()
      .subscribe((res: countriesLeague[]) => (this.leagues = res));
  }

  selectLeague(league: countriesLeague) {
    this.selectedLeague.emit(league);
  }
}
