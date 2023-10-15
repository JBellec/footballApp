import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { LeaguesComponent } from './leagues.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { StandingsComponent } from './standings/standings.component';




@NgModule({
  declarations: [CountrySelectorComponent, StandingsComponent, LeaguesComponent],
  imports: [
    MatButtonModule,
    CommonModule, RouterModule.forChild([
      { path: 'leagues', component: LeaguesComponent },
      { path: '', redirectTo: 'leagues', pathMatch: 'full' },
    ])
  ]
})
export class LeaguesModule { }
