import { Injectable } from '@angular/core';

import { ICountriesLeague } from '../../../models/countriesLeague.model';

@Injectable({
  providedIn: 'root'
})
export class CacheLeaguesService {

  private cacheStandings: {
    [key: string]: { data: ICountriesLeague; expiry: number };
  } = {};

  getStandings<T>(key: string): ICountriesLeague | null {
    const cachedData = this.cacheStandings[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as ICountriesLeague;
      } else {
        // L'élément du cache a expiré, donc nous le supprimons.
        console.log('Cache expiré, suppression');
        delete this.cacheStandings[key];
      }
    }
    return null;
  }

  setStandings<T>(
    key: string,
    data: ICountriesLeague,
    ttl: number = 3600000
  ): void {
    const expiry = Date.now() + ttl;
    this.cacheStandings[key] = { data, expiry };
  }
}
