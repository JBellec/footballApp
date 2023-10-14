import { Component, Output, EventEmitter, OnInit, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICountriesLeague } from 'src/app/models/countriesLeague.model';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';



@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit, OnDestroy {
  
  @Output() selectedLeague = new EventEmitter<ICountriesLeague>();

  leagues: ICountriesLeague[] = [];

  private leaguesService = inject(LeaguesService);
  subs!: Subscription;

  selectLeague(league: ICountriesLeague) {
    this.selectedLeague.emit(league);
  }

  ngOnInit(): void {
    this.subs = this.leaguesService
      .getAll()
      .subscribe((res: ICountriesLeague[]) => (this.leagues = res));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
