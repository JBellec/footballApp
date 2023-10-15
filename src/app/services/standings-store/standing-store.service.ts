import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandingStoreService {
  private standing: number =0;

  setSelectedStanding(standing: number) {
    this.standing = standing;
  }

  getSelectedStanding() {
    return this.standing;
  }
}
