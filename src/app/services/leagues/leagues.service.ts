import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { Leagues } from '../../models/countriesLeague.model';
import { CacheLeaguesService } from '../cache/cache-leagues/cache-leagues.service';
import { API_BASE_URL, API_KEY, LEAGUES_ENDPOINT, STANDINGS_ENDPOINT } from 'src/app/config/api.config';
import { ILeagues, ILeaguesResponse, IResponseLeaguesRequest } from 'src/app/models/responseLeaguesRequest.model';


@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private cacheLeaguesService = inject(CacheLeaguesService);

  constructor(private http: HttpClient) {}

  public getLeagues(country: string, name: string): Observable<IResponseLeaguesRequest> {

    //Valeur de la clé du cache
    var cacheKey = name;
    // Vérifie si les données sont en cache et non expirées.
    var cachedData = this.cacheLeaguesService.getLeagues<IResponseLeaguesRequest>(cacheKey);

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
      const params = new HttpParams().set('country', country).set('name', name).set('current', true);
      console.log("params = " + params);
      return this.http
        .get<IResponseLeaguesRequest>(API_BASE_URL + LEAGUES_ENDPOINT, {
          headers: headers,
          params: params,
        })
        .pipe(
          tap((data: IResponseLeaguesRequest) => {
            // Mise en cache avec une durée de validité de 10 minutes
            console.log('Mise en cache');
            this.cacheLeaguesService.setLeagues(cacheKey, data, 600000);
          })
        );
    }
  }

  mapILeaguesToICountriesLeague(iLeaguesResponse: ILeaguesResponse): Leagues {
    var season = iLeaguesResponse.seasons.find((s) => s.current);

    return new Leagues(iLeaguesResponse.league.id, iLeaguesResponse.country.name, season ? season.year.toString() : 'N/A');
  }
}
