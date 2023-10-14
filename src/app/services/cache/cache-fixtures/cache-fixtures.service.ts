import { Injectable } from '@angular/core';

import { IResponseFixtureRequest } from 'src/app/models/responseFixturesRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CacheFixturesService {
  private cacheFixture: {
    [key: string]: { data: IResponseFixtureRequest; expiry: number };
  } = {};

  getFixtures<T>(key: number): IResponseFixtureRequest | null {
    const cachedData = this.cacheFixture[key];
    if (cachedData) {
      if (Date.now() < cachedData.expiry) {
        return cachedData.data as IResponseFixtureRequest;
      } else {
        console.log('Cache expiré, suppression');
        delete this.cacheFixture[key];
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
    this.cacheFixture[key] = { data, expiry };
  }
}
