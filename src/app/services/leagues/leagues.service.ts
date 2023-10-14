import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICountriesLeague } from '../../models/countriesLeague.model';


@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ICountriesLeague[]> {
    return this.http.get<ICountriesLeague[]>('./assets/leagues.json');
  }
}
