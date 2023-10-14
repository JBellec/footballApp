import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { IResponseFixtureRequest } from '../../models/responseFixturesRequest.model';
import { API_BASE_URL, API_KEY, FIXTURES_ENDPOINT } from '../../config/api.config';
import { CacheFixturesService } from '../cache/cache-fixtures/cache-fixtures.service';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  private cacheFixturesService = inject(CacheFixturesService);

  constructor(private http: HttpClient) { }

  getTenLastFixturesByTeam(
    season: number,
    idTeam: number
  ): Observable<IResponseFixtureRequest> {

    //Valeur de la clé du cache
    var cacheKey = idTeam;
    // Vérifiez si les données sont en cache et non expirées.
    var cachedData = this.cacheFixturesService.getFixtures<IResponseFixtureRequest>(cacheKey);

    if (cachedData) {
      console.log('Données trouvées dans le cache');
      return of(cachedData);
    } else {
      // Clé d'API à passer dans le header
      const headers = new HttpHeaders()
        .set('x-rapidapi-key', API_KEY)
        .set('x-rapidapi-host', 'v3.football.api-sports.io');

      // Paramètres de la requête
      const params = new HttpParams()
        .set('season', season)
        .set('team', idTeam)
        .set('last', 10);
      console.log('params : ' + params);

      return this.http.get<IResponseFixtureRequest>(
        API_BASE_URL + FIXTURES_ENDPOINT,
        {
          headers: headers,
          params: params,
        }
      ).pipe(
        tap((data: IResponseFixtureRequest) => {
          // Mise en cache avec une durée de validité de 10 minutes
          console.log('Mise en cache Fixtures');
          this.cacheFixturesService.setFixtures(cacheKey, data, 600000);
        })
      );
    }
  }
}
