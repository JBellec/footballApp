import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { LeagueResult } from 'src/app/models/leagueResult.model';
import { IResponseLeagueRequest, IStandings } from 'src/app/models/responseLeagueRequest.model';
import { CacheStandingsService } from '../cache/cache-standings/cache-standing.service';
import { API_BASE_URL, API_KEY, STANDINGS_ENDPOINT } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private cacheStandingsService = inject(CacheStandingsService);

  constructor(private http: HttpClient) { }
  
  getStandingsLeague(
    id: string,
    season: string
  ): Observable<IResponseLeagueRequest> {
    //Valeur de la clé du cache
    var cacheKey = id;
    // Vérifie si les données sont en cache et non expirées.
    var cachedData = this.cacheStandingsService.getStandings<IResponseLeagueRequest>(cacheKey);

    if (cachedData) {
      console.log('Données trouvées dans le cache');
      return of(cachedData);
    } else {
      // Si les données ne sont pas en cache ou ont expirées, requête à l'API.
      // Clé d'API à passer dans le header
      const headers = new HttpHeaders()
        .set('x-rapidapi-key', API_KEY)
        .set('x-rapidapi-host', 'v3.football.api-sports.io');

      // Paramètres de la requête
      const params = new HttpParams().set('league', id).set('season', season);

      return this.http
        .get<IResponseLeagueRequest>(API_BASE_URL + STANDINGS_ENDPOINT, {
          headers: headers,
          params: params,
        })
        .pipe(
          tap((data: IResponseLeagueRequest) => {
            // Mise en cache avec une durée de validité de 10 minutes
            console.log('Mise en cache');
            this.cacheStandingsService.setStandings(cacheKey, data, 600000);
          })
        );
    }
  }

  mapIStandingsToLeagueResult(iStandings: IStandings[]): LeagueResult[] {
    return iStandings.map((standings: IStandings) => {
      return new LeagueResult(
        standings.rank,
        standings.team.logo,
        standings.team.name,
        standings.all.played,
        standings.all.win,
        standings.all.lose,
        standings.all.draw,
        standings.goalsDiff,
        standings.points,
        standings.team.id
      );
    });
  }
}
