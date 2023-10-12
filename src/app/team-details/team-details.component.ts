import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballApiService } from '../services/football-api/football-api.service';
import { IResponseFixtureRequest } from '../models/responseFixturesRequest.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {
  constructor(private route: ActivatedRoute, private footballService: FootballApiService) {
    this.route.params.subscribe(params => {
      const idTeam = params['idTeam'];
      this.footballService.getTenLastFixturesByTeam(2023,idTeam).subscribe((res: IResponseFixtureRequest)=>{
        console.log(JSON.stringify(res));
      })
    });
  }
}
