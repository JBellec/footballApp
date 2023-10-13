import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballApiService } from '../../services/football-api/football-api.service';
import { IResponseFixtureRequest } from '../../models/responseFixturesRequest.model';
import { Fixtures } from 'src/app/models/fixtures.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private footballService: FootballApiService) {}
  details: Fixtures[] = [];

  goBack() {
    window.history.back();
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idTeam = params['idTeam'];
      this.footballService.getTenLastFixturesByTeam(2023,idTeam).subscribe((res: IResponseFixtureRequest)=>{
        console.log(JSON.stringify(res.response));
        res!.response.forEach(elem => {
          var fixture: Fixtures = Fixtures.fromApiResponse(elem);
          this.details.push(fixture);
        })
      })
    });
  }
}
