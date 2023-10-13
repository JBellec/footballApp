import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { StandingsComponent } from './standings/standings.component';
import { RouterModule } from '@angular/router';
import { LeaguesComponent } from './leagues.component';



@NgModule({
  declarations: [CountrySelectorComponent, StandingsComponent, LeaguesComponent],
  imports: [
    CommonModule, RouterModule.forChild([
      { path: 'leagues', component: LeaguesComponent },
      { path: '', redirectTo: 'leagues', pathMatch: 'full' },
    ])
  ]
})
export class LeaguesModule { }
