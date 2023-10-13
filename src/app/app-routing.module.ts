import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/app-league', pathMatch: 'full' },
  {
    path: 'app-league',
    loadChildren: () => import('./leagues/leagues.module').then((m) => m.LeaguesModule),
  },
  {
    path: 'team-details/:teamId',
    loadChildren: () => import('./fixtures/fixtures.module').then((m) => m.FixturesModule),
  },
  { path: '**', redirectTo: 'not-found' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
