import { Injectable } from '@angular/core';

import { IResponseLeaguesRequest } from 'src/app/models/responseLeaguesRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CacheLeaguesService {

  private cacheLeagues: {
    [key: string]: { data: IResponseLeaguesRequest; expiry: number };
  } = {};

  getLeagues<T>(key: string): IResponseLeaguesRequest | null {
    const cachedData = this.cacheLeagues[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseLeaguesRequest;
      } else {
        // L'élément du cache a expiré, donc nous le supprimons.
        console.log('Cache expiré, suppression');
        delete this.cacheLeagues[key];
      }
    }
    return null;
  }

  setLeagues<T>(
    key: string,
    data: IResponseLeaguesRequest,
    ttl: number = 3600000
  ): void {
    const expiry = Date.now() + ttl;
    this.cacheLeagues[key] = { data, expiry };
  }
}
