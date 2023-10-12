import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { countriesLeague } from 'src/app/models/countriesLeague.model';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<countriesLeague[]> {
    return this.http.get<countriesLeague[]>('./assets/leagues.json');
  }
}
