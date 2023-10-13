import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TeamDetailsComponent],
  imports: [
    CommonModule, RouterModule.forChild([
      { path: 'team-details/:idTeam', component: TeamDetailsComponent }
    ])
  ]
})
export class FixturesModule { }
