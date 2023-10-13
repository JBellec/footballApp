import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandingStoreService {
  private standing: string='';

  setSelectedStanding(standing: string) {
    this.standing = standing;
  }

  getSelectedStanding() {
    return this.standing;
  }
}
