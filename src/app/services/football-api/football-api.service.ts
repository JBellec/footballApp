import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { CacheService } from '../cache/cache.service';
import { IResponseLeagueRequest, IStandings } from 'src/app/models/responseLeagueRequest.model';
import { LeagueResult } from 'src/app/models/leagueResult.model';
import { IResponseFixtureRequest } from 'src/app/models/responseFixturesRequest.model';

@Injectable({
  providedIn: 'root',
})
export class FootballApiService {
  private apiBaseUrl = 'https://v3.football.api-sports.io/';
  private standingsEndpoint = 'standings';
  private fixturesEndpoint = 'fixtures';
  private apiKey = 'dbb2b2aa4e9e328396dc5168b20e5c37';

  private cacheService = inject(CacheService);

  constructor(private http: HttpClient) {}

  getResponseLeague(
    id: string,
    season: string
  ): Observable<IResponseLeagueRequest> {
    //Valeur de la clé du cache
    var cacheKey = id;

    // Vérifiez si les données sont en cache et non expirées.
    var cachedData = this.cacheService.get<IResponseLeagueRequest>(cacheKey);

    if (cachedData) {
      console.log('Données trouvées dans le cache');
      return of(cachedData);
    } else {
      // Si les données ne sont pas en cache ou ont expiré, faites la requête à l'API.
      // Clé d'API à passer dans le header
      const headers = new HttpHeaders()
        .set('x-rapidapi-key', this.apiKey)
        .set('x-rapidapi-host', 'v3.football.api-sports.io');

      // Paramètres de la requête
      const params = new HttpParams().set('league', id).set('season', season);
      console.log('params : ' + params);

      return this.http
        .get<IResponseLeagueRequest>(this.apiBaseUrl + this.standingsEndpoint, {
          headers: headers,
          params: params,
        })
        .pipe(
          tap((data: IResponseLeagueRequest) => {
            // Mettez les données en cache avec une durée de validité de 10 minutes (600 000 millisecondes).
            console.log('Mise en cahce');
            this.cacheService.set(cacheKey, data, 600000);
          })
        );
    }
  }

  mapIStandingsToLeagueResult(iStandings: IStandings[]): LeagueResult[] {
    var leagueResults: LeagueResult[] = [];
    iStandings.forEach((standings: IStandings) => {
      leagueResults.push(
        new LeagueResult(
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
        )
      );
    });
    return leagueResults;
  }

  getTenLastFixturesByTeam(
    season: number,
    idTeam: number
  ): Observable<IResponseFixtureRequest> {
    // Clé d'API à passer dans le header
    const headers = new HttpHeaders()
      .set('x-rapidapi-key', this.apiKey)
      .set('x-rapidapi-host', 'v3.football.api-sports.io');

    // Paramètres de la requête
    const params = new HttpParams()
      .set('season', season)
      .set('team', idTeam)
      .set('last', 10);
    console.log('params : ' + params);

    return this.http.get<IResponseFixtureRequest>(
      this.apiBaseUrl + this.fixturesEndpoint,
      {
        headers: headers,
        params: params,
      }
    );
  }
}
