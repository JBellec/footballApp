import { Injectable } from '@angular/core';

import { IResponseStandingsRequest } from '../../../models/responseStandingsRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CacheStandingsService {
  private cacheStandings: {
    [key: number]: { data: IResponseStandingsRequest; expiry: number };
  } = {};

  getStandings<T>(key: number): IResponseStandingsRequest | null {
    const cachedData = this.cacheStandings[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseStandingsRequest;
      } else {
        // L'élément du cache a expiré, donc nous le supprimons.
        console.log('Cache expiré, suppression');
        delete this.cacheStandings[key];
      }
    }
    return null;
  }

  setStandings<T>(
    key: number,
    data: IResponseStandingsRequest,
    ttl: number = 600000
  ): void {
    const expiry = Date.now() + ttl;
    this.cacheStandings[key] = { data, expiry };
  }
}
