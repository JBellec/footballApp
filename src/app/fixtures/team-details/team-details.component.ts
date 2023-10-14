import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResponseFixtureRequest } from '../../models/responseFixturesRequest.model';
import { Fixtures } from 'src/app/models/fixtures.model';
import { FixturesService } from 'src/app/services/fixtures/fixtures.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private fixturesService: FixturesService) {}
  details: Fixtures[] = [];

  subs!: Subscription;

  goBack() {
    window.history.back();
  }
  
  ngOnInit(): void {
    this.subs = this.route.params.subscribe(params => {
      const idTeam = params['idTeam'];
      this.fixturesService.getTenLastFixturesByTeam(2023,idTeam).subscribe((res: IResponseFixtureRequest)=>{
        res!.response.forEach(elem => {
          var fixture: Fixtures = Fixtures.fromApiResponse(elem);
          this.details.push(fixture);
        })
      })
    });
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
