import { Injectable } from '@angular/core';
import { IResponseFixtureRequest } from 'src/app/models/responseFixturesRequest.model';

import { IResponseLeagueRequest } from 'src/app/models/responseLeagueRequest.model';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cacheStandings: {
    [key: string]: { data: IResponseLeagueRequest; expiry: number };
  } = {};

  private cacheFixture: {
    [key: string]: { data: IResponseFixtureRequest; expiry: number };
  } = {};

  constructor() {}

  getStandings<T>(key: string): IResponseLeagueRequest | null {
    const cachedData = this.cacheStandings[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseLeagueRequest;
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
    data: IResponseLeagueRequest,
    ttl: number = 600000
  ): void {
    const expiry = Date.now() + ttl;
    this.cacheStandings[key] = { data, expiry };
  }

  getFixtures<T>(key: number): IResponseFixtureRequest | null {
    const cachedData = this.cacheStandings[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseFixtureRequest;
      } else {
        // L'élément du cache a expiré, donc nous le supprimons.
        console.log('Cache expiré, suppression');
        delete this.cacheStandings[key];
      }
    }
    return null;
  }

  setFixtures<T>(
    key: number,
    data: IResponseFixtureRequest,
    ttl: number = 600000
  ): void {
    const expiry = Date.now() + ttl;
    this.cacheStandings[key] = { data, expiry };
  }
}
