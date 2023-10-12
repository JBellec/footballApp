import { Injectable } from '@angular/core';

import { IResponseLeagueRequest } from 'src/app/models/responseLeagueRequest.model';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: {
    [key: string]: { data: IResponseLeagueRequest; expiry: number };
  } = {};

  constructor() {}

  get<IResponseLeagueRequest>(key: string): IResponseLeagueRequest | null {
    const cachedData = this.cache[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseLeagueRequest;
      } else {
        // L'élément du cache a expiré, donc nous le supprimons.
        console.log('Cache expiré, suppression');
        delete this.cache[key];
      }
    }
    return null;
  }

  set<T>(
    key: string,
    data: IResponseLeagueRequest,
    ttl: number = 600000
  ): void {
    const expiry = Date.now() + ttl; // Date d'expiration en millisecondes (10 minutes par défaut)
    this.cache[key] = { data, expiry };
  }
}
